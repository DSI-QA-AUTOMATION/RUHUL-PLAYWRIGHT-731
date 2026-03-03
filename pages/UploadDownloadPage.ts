import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class UploadDownloadPage extends BasePage {
  private uploadFileInput = '#uploadFile';
  private downloadButton = '#downloadButton';
  private uploadFilePath = '#uploadedFilePath';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/upload-download');
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.page.setInputFiles(this.uploadFileInput, filePath);
  }

  async clickDownload(): Promise<void> {
    await this.page.click(this.downloadButton);
  }

  async getUploadedFilePath(): Promise<string> {
    return await this.getText(this.uploadFilePath);
  }

  async isDownloadButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.downloadButton);
  }
}
