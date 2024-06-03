import { Page, Locator } from 'playwright';

export class GotItPopupPage {
  private page: Page;
  private gotItButton: Locator;
  private popupText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.popupText = page.frameLocator('iframe[name="WacFrame_Excel_0"]').getByText('New and improved insert function experienceBuild formulas easily with the new');
    this.gotItButton = page.frameLocator('iframe[name="WacFrame_Excel_0"]').getByLabel('Got it');
  }

  async clickGotItButton() {
    try {
      await this.popupText.waitFor({ state: 'visible', timeout: 3000 });

      if (await this.popupText.isVisible()) {
        await this.gotItButton.click();
        console.log('"Got it" button clicked');
      }
    } catch (error) {
      console.log('"Got it" button not found or not interactable:', error);
    }
  }
}
