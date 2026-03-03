import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class RadioButtonPage extends BasePage {
  private yesRadioButton = 'label:has-text("Yes")';
  private impressiveRadioButton = 'label:has-text("Impressive")';
  private noRadioButton = 'label:has-text("No")';
  private successMessage = '.text-success';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/radio-button');
  }

  async selectYes(): Promise<void> {
    await this.page.click(this.yesRadioButton);
  }

  async selectImpressive(): Promise<void> {
    await this.page.click(this.impressiveRadioButton);
  }

  async getSelectionMessage(): Promise<string> {
    return await this.getText(this.successMessage);
  }

  async isRadioSelected(selector: string): Promise<boolean> {
    const element = this.page.locator(selector);
    return await element.isChecked();
  }
}
