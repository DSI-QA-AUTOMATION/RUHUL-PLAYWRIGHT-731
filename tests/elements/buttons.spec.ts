import { test, expect } from '@playwright/test';

test.describe('Buttons Tests', () => {
  test('Verify double click action', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    await page.dblclick('#doubleClickBtn');
    await expect(page.locator('#doubleClickMessage')).toContainText('double click');
  });

  test('Verify right click action', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    await page.locator('#rightClickBtn').click({ button: 'right' });
    await expect(page.locator('#rightClickMessage')).toContainText('right click');
  });

  test('Verify click Me action', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    await page.getByRole('button', { name: 'Click Me', exact: true }).click();
    await expect(page.locator('#dynamicClickMessage')).toContainText('dynamic click');
  });
});
