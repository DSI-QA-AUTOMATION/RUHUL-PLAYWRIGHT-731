import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class FramesPage extends BasePage {
  private frame1 = '#frame1';
  private frame2 = '#frame2';
  private frameHeading = 'h1';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/frames');
  }

  async getFrame1Content(): Promise<string> {
    const frame1Element = this.page.frameLocator(this.frame1);
    return await frame1Element.locator(this.frameHeading).textContent() || '';
  }

  async getFrame2Content(): Promise<string> {
    const frame2Element = this.page.frameLocator(this.frame2);
    return await frame2Element.locator(this.frameHeading).textContent() || '';
  }
}
