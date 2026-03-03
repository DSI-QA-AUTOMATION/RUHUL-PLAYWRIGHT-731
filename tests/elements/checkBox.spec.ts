import { test, expect } from '@playwright/test';

test.describe('Check Box Tests', () => {
  test('Verify checkbox page loads', async ({ page }) => {
    await page.goto('https://demoqa.com/checkbox');
    await page.waitForTimeout(2000);
    
    // Just verify page loads with h1
    await expect(page.locator('h1')).toContainText('Check Box');
  });
});
