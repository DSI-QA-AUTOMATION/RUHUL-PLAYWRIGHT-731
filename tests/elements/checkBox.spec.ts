import { test, expect } from '@playwright/test';

test.describe('Check Box Tests', () => {
  test('Select multiple checkboxes', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Click the expand all button
    await page.locator('.rct-option-expand-all').click();
    
    // Wait for expansion
    await page.waitForTimeout(500);
    
    // Click on Home checkbox label
    const homeLabel = page.locator('.rct-title').filter({ hasText: 'Home' }).first();
    await homeLabel.click();
    
    // Verify checkbox is checked by checking the class
    const checkIcon = page.locator('.rct-node-home .rct-icon-check');
    await expect(checkIcon).toBeVisible();
  });
});
