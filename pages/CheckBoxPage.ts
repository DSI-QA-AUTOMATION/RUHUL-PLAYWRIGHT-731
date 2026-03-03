import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class CheckBoxPage extends BasePage {
  private expandAllButton = 'button[title="Expand all"]';
  private treeNode = '.rct-node';
  private checkBoxLabel = 'label';
  private homeCheckBox = 'label:has-text("Home")';
  private desktopCheckBox = 'label:has-text("Desktop")';
  private documentsCheckBox = 'label:has-text("Documents")';
  private downloadsCheckBox = 'label:has-text("Downloads")';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/checkbox');
  }

  async expandAll(): Promise<void> {
    await this.page.click(this.expandAllButton);
  }

  async checkHome(): Promise<void> {
    await this.page.click(this.homeCheckBox);
  }

  async checkDesktop(): Promise<void> {
    await this.page.click(this.desktopCheckBox);
  }

  async checkDocuments(): Promise<void> {
    await this.page.click(this.documentsCheckBox);
  }

  async checkDownloads(): Promise<void> {
    await this.page.click(this.downloadsCheckBox);
  }

  async isChecked(selector: string): Promise<boolean> {
    const element = this.page.locator(selector);
    return await element.isChecked();
  }

  async getSelectedItemsText(): Promise<string> {
    const resultElement = this.page.locator('.text-success');
    return await resultElement.allTextContents();
  }
}
