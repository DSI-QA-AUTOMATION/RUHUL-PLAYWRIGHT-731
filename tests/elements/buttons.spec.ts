import { test, expect } from '@playwright/test';
import { ButtonsPage } from '../pages/ButtonsPage';

test.describe('Buttons Tests', () => {
  let buttonsPage: ButtonsPage;

  test.beforeEach(async ({ page }) => {
    buttonsPage = new ButtonsPage(page);
    await buttonsPage.navigate();
  });

  test('Verify double click action', async ({ page }) => {
    const buttonsPage = new ButtonsPage(page);
    await buttonsPage.navigate();

    await buttonsPage.doubleClick();

    const message = await buttonsPage.getDoubleClickMessage();
    expect(message).toContain('double click');
  });

  test('Verify right click action', async ({ page }) => {
    const buttonsPage = new ButtonsPage(page);
    await buttonsPage.navigate();

    await buttonsPage.rightClick();

    const message = await buttonsPage.getRightClickMessage();
    expect(message).toContain('right click');
  });

  test('Verify click Me action', async ({ page }) => {
    const buttonsPage = new ButtonsPage(page);
    await buttonsPage.navigate();

    await buttonsPage.clickMe();

    const message = await buttonsPage.getDynamicClickMessage();
    expect(message).toContain('clicked');
  });
});
