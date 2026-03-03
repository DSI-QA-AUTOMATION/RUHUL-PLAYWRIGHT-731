import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class ButtonsPage extends BasePage {
  private doubleClickButton = '#doubleClickBtn';
  private rightClickButton = '#rightClickBtn';
  private clickMeButton = 'button:text("Click Me")';
  private doubleClickMessage = '#doubleClickMessage';
  private rightClickMessage = '#rightClickMessage';
  private dynamicClickMessage = '#dynamicClickMessage';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/buttons');
  }

  async doubleClick(): Promise<void> {
    await this.page.dblclick(this.doubleClickButton);
  }

  async rightClick(): Promise<void> {
    await this.page.locator(this.rightClickButton).click({ button: 'right' });
  }

  async clickMe(): Promise<void> {
    await this.page.click(this.clickMeButton);
  }

  async getDoubleClickMessage(): Promise<string> {
    return await this.getText(this.doubleClickMessage);
  }

  async getRightClickMessage(): Promise<string> {
    return await this.getText(this.rightClickMessage);
  }

  async getDynamicClickMessage(): Promise<string> {
    return await this.getText(this.dynamicClickMessage);
  }
}
