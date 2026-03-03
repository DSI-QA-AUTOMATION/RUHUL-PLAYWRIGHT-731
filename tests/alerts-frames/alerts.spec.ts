import { test, expect } from '@playwright/test';

test.describe('Alerts Tests', () => {
  test('Handle simple alert popup', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');
    
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });

    await page.click('#alertButton');
    await page.waitForTimeout(500);
  });

  test('Handle confirm alert - accept', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');

    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    await page.click('#confirmButton');
    const result = await page.locator('#confirmResult').textContent();
    expect(result).toContain('Ok');
  });

  test('Handle confirm alert - dismiss', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');

    page.on('dialog', async dialog => {
      await dialog.dismiss();
    });

    await page.click('#confirmButton');
    const result = await page.locator('#confirmResult').textContent();
    expect(result).toContain('Cancel');
  });

  test('Handle prompt alert', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');

    const testInput = 'Test User';
    page.on('dialog', async dialog => {
      await dialog.accept(testInput);
    });

    await page.click('#promtButton');
    const result = await page.locator('#promptResult').textContent();
    expect(result).toContain(testInput);
  });
});
