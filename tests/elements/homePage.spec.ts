import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Home Page Tests', () => {
  test('Verify all main categories are visible', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    await expect(page.locator('h5:has-text("Elements")')).toBeVisible();
    await expect(page.locator('h5:has-text("Forms")')).toBeVisible();
    await expect(page.locator('h5:has-text("Alerts")')).toBeVisible();
    await expect(page.locator('h5:has-text("Widgets")')).toBeVisible();
    await expect(page.locator('h5:has-text("Interactions")')).toBeVisible();
    await expect(page.locator('h5:has-text("Book Store")')).toBeVisible();
  });
});
