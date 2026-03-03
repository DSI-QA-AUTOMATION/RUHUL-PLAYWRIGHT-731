import { test, expect } from '@playwright/test';
import { CheckBoxPage } from '../../pages/CheckBoxPage';

test.describe('Check Box Tests', () => {
  let checkBoxPage: CheckBoxPage;

  test.beforeEach(async ({ page }) => {
    checkBoxPage = new CheckBoxPage(page);
    await checkBoxPage.navigate();
  });

  test('Select multiple checkboxes', async ({ page }) => {
    const checkBoxPage = new CheckBoxPage(page);
    await checkBoxPage.navigate();

    await checkBoxPage.expandAll();

    await checkBoxPage.checkHome();
    await checkBoxPage.checkDesktop();
    await checkBoxPage.checkDocuments();
    await checkBoxPage.checkDownloads();

    const isHomeChecked = await checkBoxPage.isChecked('label:has-text("Home") span[class="rct-checkbox"]');
    const isDesktopChecked = await checkBoxPage.isChecked('label:has-text("Desktop") span[class="rct-checkbox"]');

    expect(isHomeChecked).toBeTruthy();
    expect(isDesktopChecked).toBeTruthy();
  });
});
