import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../../pages/TextBoxPage';

test.describe('Text Box Tests', () => {
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

    await expect(page.locator('#output')).toBeVisible();
    
    const outputText = await page.locator('#output').textContent();
    expect(outputText).toContain(testData.fullName);
    expect(outputText).toContain(testData.email);
    expect(outputText).toContain(testData.currentAddress);
    expect(outputText).toContain(testData.permanentAddress);
  });
});
