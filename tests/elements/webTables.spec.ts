import { test, expect } from '@playwright/test';

test.describe('Web Tables Tests', () => {
  test('Add new record to web table', async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');
    await page.waitForLoadState('networkidle');
    
    // Click Add button
    await page.click('#addNewRecordButton');
    
    // Wait for modal
    await page.waitForSelector('#firstName');
    
    // Fill the form
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Smith');
    await page.fill('#userEmail', 'john.smith@example.com');
    await page.fill('#age', '30');
    await page.fill('#salary', '50000');
    await page.fill('#department', 'Engineering');
    
    // Submit
    await page.click('#submit');
    
    // Wait for the record to be added - use general body text instead of class selector
    await expect(page.locator('body')).toContainText('John', { timeout: 5000 });
  });

  test('Search existing record', async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');
    await page.waitForLoadState('networkidle');
    
    // Wait for the page to stabilize
    await page.waitForTimeout(1000);
    
    // Search for a record
    await page.fill('#searchBox', 'cierra');
    
    // Wait for the search results using body selector
    await expect(page.locator('body')).toContainText('cierra', { timeout: 5000 });
  });
});
