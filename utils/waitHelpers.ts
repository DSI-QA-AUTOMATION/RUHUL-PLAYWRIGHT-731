import { Page, Locator } from '@playwright/test';

export const waitHelpers = {
  async waitForElementVisible(page: Page, selector: string, timeout: number = 10000): Promise<void> {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  },

  async waitForElementHidden(page: Page, selector: string, timeout: number = 10000): Promise<void> {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  },

  async waitForElementEnabled(page: Page, selector: string, timeout: number = 10000): Promise<void> {
    await page.waitForSelector(selector, { state: 'attached', timeout });
    await page.waitForFunction((sel) => {
      const el = document.querySelector(sel) as HTMLElement;
      return el && !el.hasAttribute('disabled');
    }, selector, { timeout });
  },

  async waitForUrl(page: Page, urlPattern: string | RegExp, timeout: number = 10000): Promise<void> {
    await page.waitForURL(urlPattern, { timeout });
  },

  async waitForText(page: Page, selector: string, text: string, timeout: number = 10000): Promise<void> {
    await page.waitForFunction(
      (sel, txt) => {
        const el = document.querySelector(sel);
        return el && el.textContent?.includes(txt);
      },
      selector,
      text,
      { timeout }
    );
  },

  async waitForNetworkIdle(page: Page, timeout: number = 10000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  },

  async waitForSelectorAndClick(page: Page, selector: string, timeout: number = 10000): Promise<void> {
    await page.waitForSelector(selector, { state: 'visible', timeout });
    await page.click(selector);
  },

  async waitForSelectorAndFill(page: Page, selector: string, value: string, timeout: number = 10000): Promise<void> {
    await page.waitForSelector(selector, { state: 'visible', timeout });
    await page.fill(selector, value);
  }
};
