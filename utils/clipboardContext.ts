import { chromium, BrowserContext } from 'playwright';

export async function createContextWithClipboardPermissions(): Promise<BrowserContext> {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write']
  });

  return context;
}
