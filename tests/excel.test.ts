import { test, expect, BrowserContext, Page } from '@playwright/test';
import { createContextWithClipboardPermissions } from '../utils/clipboardContext';
import { ExcelPage } from '../pages/ExcelPage';
import { LoginPage } from '../pages/LoginPage';

let context: BrowserContext;
let page: Page;
let newPage: Page;

test.beforeEach(async () => {
  context = await createContextWithClipboardPermissions();
  page = await context.newPage();
  const loginPage = new LoginPage(page);
  await loginPage.navigateToMicrosoftLogin();
  await loginPage.login();

  const excelPage = new ExcelPage(page);
  await excelPage.openExcelApp();
  newPage = await excelPage.createNewWorkbook();
});

test('Validate TODAY() function in Excel', async () => {
  const excelPage = new ExcelPage(page);

  const today = new Date();
  const formattedToday = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

  const clipboardContent = await excelPage.performTodayFunctionAndCopy(newPage);
  console.log(`Clipboard content: '${clipboardContent}'`);

  expect(clipboardContent.trim(), `Expected cell value to be ${formattedToday}`).toBe(formattedToday);

  console.log(`Cell A1 contains the correct date: ${formattedToday}`);
});
