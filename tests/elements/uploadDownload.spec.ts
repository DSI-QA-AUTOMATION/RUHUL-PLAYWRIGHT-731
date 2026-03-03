import { test, expect } from '@playwright/test';
import { UploadDownloadPage } from '../pages/UploadDownloadPage';
import * as path from 'path';

test.describe('Upload/Download Tests', () => {
  let uploadDownloadPage: UploadDownloadPage;

  test.beforeEach(async ({ page }) => {
    uploadDownloadPage = new UploadDownloadPage(page);
    await uploadDownloadPage.navigate();
  });

  test('Upload a file', async ({ page }) => {
    const uploadDownloadPage = new UploadDownloadPage(page);
    await uploadDownloadPage.navigate();

    const sampleFilePath = path.join(__dirname, '../../test-data/sample.txt');
    await uploadDownloadPage.uploadFile(sampleFilePath);

    const filePathText = await uploadDownloadPage.getUploadedFilePath();
    expect(filePathText).toContain('sample.txt');
  });

  test('Verify download button is visible', async ({ page }) => {
    const uploadDownloadPage = new UploadDownloadPage(page);
    await uploadDownloadPage.navigate();

    const isVisible = await uploadDownloadPage.isDownloadButtonVisible();
    expect(isVisible).toBeTruthy();
  });
});
