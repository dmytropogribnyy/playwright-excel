import { Page, Locator } from 'playwright';
import { logger } from '../utils/logger';
import { config } from '../utils/config';

export class LoginPage {
  private page: Page;
  private emailInput: Locator;
  private nextButton: Locator;
  private passwordInput: Locator;
  private signInButton: Locator;
  private yesButton: Locator;
  private useAnotherAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Email, phone, or Skype');
    this.nextButton = page.locator('input[type="submit"]');
    this.passwordInput = page.getByTestId('i0118');
    this.signInButton = page.locator('#idSIButton9');
    this.yesButton = page.getByText('Yes');
    this.useAnotherAccountButton = page.locator('div#otherTileText');
  }

  async navigateToMicrosoftLogin() {
    logger.debug("Navigate to Microsoft Login page");
    await this.page.goto(config.msLoginUrl);
    await this.page.waitForLoadState('load');
    console.log("Microsoft Login page loaded");

    if (await this.useAnotherAccountButton.isVisible()) {
      await this.useAnotherAccountButton.click();
      console.log('"Use another account" button clicked');
    }
  }

  async enterEmail(email: string) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.nextButton.click();
    await this.page.waitForLoadState("load");
  }

  async enterPassword(password: string) {
    await this.passwordInput.waitFor({ state: "visible", timeout: 10000 });
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("load");
  }

  async handleStaySignedIn() {
    logger.debug('Handle "Stay signed in"');
    await this.yesButton.waitFor({ state: 'visible', timeout: 5000 });
    if (await this.yesButton.isVisible()) {
      await this.yesButton.click();
    }
  }

  async login() {
    const { email, password } = config;

    await this.navigateToMicrosoftLogin();
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.handleStaySignedIn();
  }
}
