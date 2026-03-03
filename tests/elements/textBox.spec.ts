import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../../pages/TextBoxPage';

test.describe('Text Box Tests', () => {
  let textBoxPage: TextBoxPage;

  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigate();
  });

  test('Submit text box with valid data', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigate();

    const testData = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      currentAddress: '123 Main Street',
      permanentAddress: '456 Oak Avenue'
    };

    await textBoxPage.fillForm(
      testData.fullName,
      testData.email,
      testData.currentAddress,
      testData.permanentAddress
    );

    await textBoxPage.submit();

    await expect(textBoxPage.isOutputVisible()).toBeTruthy();
    await expect(await textBoxPage.getOutputName()).toContain(testData.fullName);
    await expect(await textBoxPage.getOutputEmail()).toContain(testData.email);
    await expect(await textBoxPage.getOutputCurrentAddress()).toContain(testData.currentAddress);
    await expect(await textBoxPage.getOutputPermanentAddress()).toContain(testData.permanentAddress);
  });
});
