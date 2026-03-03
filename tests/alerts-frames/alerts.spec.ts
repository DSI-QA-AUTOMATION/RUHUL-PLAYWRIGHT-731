import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pages/AlertsPage';

test.describe('Alerts Tests', () => {
  let alertsPage: AlertsPage;

  test.beforeEach(async ({ page }) => {
    alertsPage = new AlertsPage(page);
    await alertsPage.navigate();
  });

  test('Handle simple alert popup', async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.navigate();

    await alertsPage.triggerAlert();
    
    const dialogPromise = page.waitForEvent('dialog');
    const dialog = await dialogPromise;
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
  });

  test('Handle confirm alert - accept', async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.navigate();

    await alertsPage.triggerConfirmAlert(true);

    const result = await alertsPage.getConfirmResult();
    expect(result).toContain('Ok');
  });

  test('Handle confirm alert - dismiss', async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.navigate();

    await alertsPage.triggerConfirmAlert(false);

    const result = await alertsPage.getConfirmResult();
    expect(result).toContain('Cancel');
  });

  test('Handle prompt alert', async ({ page }) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.navigate();

    const testInput = 'Test User';
    await alertsPage.triggerPromptAlert(testInput);

    const result = await alertsPage.getPromptResult();
    expect(result).toContain(testInput);
  });
});
