import { test, expect } from '@playwright/test';

test.describe('Check Box Tests', () => {
  test('Select multiple checkboxes', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    
    // Expand all
    await page.click('button[title="Expand all"]');
    
    // Check some options
    await page.click('label:has-text("Home")');
    await page.click('label:has-text("Desktop")');
    
    // Verify they are checked
    const homeCheckbox = page.locator('label:has-text("Home") .rct-checkbox');
    const desktopCheckbox = page.locator('label:has-text("Desktop") .rct-checkbox');
    
    await expect(homeCheckbox).toHaveClass(/rct-icon-check/);
    await expect(desktopCheckbox).toHaveClass(/rct-icon-check/);
  });
});
