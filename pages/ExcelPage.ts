import { Page, Locator } from "playwright";
import { GotItPopupPage } from "./GotItPopupPage";
import { config } from "../utils/config";

export class ExcelPage {
  private page: Page;
  private blankWorkbookLink: Locator;

  private readonly cellWidth = 63;
  private readonly cellHeight = 19;

  constructor(page: Page) {
    this.page = page;
    this.blankWorkbookLink = page
      .getByTestId("officehome-scroll-content")
      .getByText("Blank workbook");
  }

  async openExcelApp() {
    await this.page.goto(config.excelUrl);
    await this.page.waitForLoadState("load");
    console.log("Excel app opened");
  }

  async createNewWorkbook(): Promise<Page> {
    await this.blankWorkbookLink.waitFor({ state: "visible", timeout: 60000 });
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.blankWorkbookLink.click(),
    ]);
    console.log("New workbook created");

    await this.ensureBookPageLoaded(newPage);
    return newPage;
  }

  async ensureBookPageLoaded(newPage: Page) {
    const maxWaitTime = 5000;
    const selectorToCheck = newPage
      .frameLocator('iframe[name="WacFrame_Excel_0"]')
      .getByRole("tab", { name: "Formulas" });

    try {
      await selectorToCheck.waitFor({ timeout: maxWaitTime });
    } catch (error) {
      console.log("Page did not load in time, reloading...");
      await newPage.reload();
      await selectorToCheck.waitFor({ timeout: maxWaitTime });
    }
  }

  private getCellCoordinates(column: number, row: number): { x: number; y: number } {
    return {
      x: (column - 1) * this.cellWidth,
      y: (row - 1) * this.cellHeight,
    };
  }

  private async clickCell(page: Page, column: number, row: number): Promise<{ centerX: number; centerY: number }> {
    const canvas = page
      .frameLocator('iframe[name="WacFrame_Excel_0"]')
      .locator("#Sheet0_0_0_1 canvas");

    await canvas.waitFor({ state: "visible", timeout: 30000 });
    const boundingBox = await canvas.boundingBox();
    if (!boundingBox) {
      throw new Error("Could not get bounding box of the canvas");
    }

    const { x, y } = this.getCellCoordinates(column, row);
    const centerX = x + this.cellWidth / 2;
    const centerY = y + this.cellHeight / 2;

    await page.evaluate(
      ({ x, y }) => {
        window.scrollTo(x, y);
      },
      { x, y }
    );

    await page.waitForTimeout(500);
    await canvas.click({
      position: { x: centerX, y: centerY },
      delay: 500,
    });

    return { centerX, centerY };
  }

  async clearClipboard(page: Page) {
    await page.evaluate(() => {
      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);
      textarea.value = "";
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    });
  }

  async enterTodayFunction(newPage: Page) {
    await this.clearClipboard(newPage);

    const { centerX, centerY } = await this.clickCell(newPage, 1, 1);
    await newPage.keyboard.type("=TODAY()");
    await newPage.keyboard.press("Enter");
    console.log("Entered =TODAY() function");

    const gotItPopupPage = new GotItPopupPage(newPage);
    await gotItPopupPage.clickGotItButton();

    return { centerX, centerY };
  }

  async copyCellContent(newPage: Page) {
    await newPage.keyboard.down("Control");
    await newPage.keyboard.press("C");
    await newPage.keyboard.up("Control");
    await newPage.waitForTimeout(1000);
    return await newPage.evaluate(() => navigator.clipboard.readText());
  }

  async performTodayFunctionAndCopy(newPage: Page) {
    await this.clearClipboard(newPage);
    const { centerX, centerY } = await this.enterTodayFunction(newPage);
    const frame = newPage.frameLocator('iframe[name="WacFrame_Excel_0"]').first();
    await frame.locator(`#Sheet0_0_0_1 canvas`).click({
      position: { x: centerX, y: centerY },
      force: true,
    });
    await newPage.waitForTimeout(1000);
    return await this.copyCellContent(newPage);
  }
}
