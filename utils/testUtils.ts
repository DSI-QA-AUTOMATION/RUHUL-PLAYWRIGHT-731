import { Page } from '@playwright/test';

export const testUtils = {
  async takeScreenshot(page: Page, name: string): Promise<void> {
    await page.screenshot({ path: `./reports/screenshots/${name}.png`, fullPage: true });
  },

  async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
  },

  async getRandomNumber(min: number, max: number): Promise<number> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  async generateRandomEmail(): Promise<string> {
    const randomNum = Math.floor(Math.random() * 10000);
    return `testuser${randomNum}@example.com`;
  },

  async generateRandomName(): Promise<string> {
    const names = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma'];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }
};
