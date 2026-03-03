import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Home Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('Verify all main categories are visible', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    await expect(homePage.isElementsCardVisible()).toBeTruthy();
    await expect(homePage.isFormsCardVisible()).toBeTruthy();
    await expect(homePage.isAlertsFrameWindowsCardVisible()).toBeTruthy();
    await expect(homePage.isWidgetsCardVisible()).toBeTruthy();
    await expect(homePage.isInteractionsCardVisible()).toBeTruthy();
    await expect(homePage.isBookStoreApplicationCardVisible()).toBeTruthy();
  });
});
