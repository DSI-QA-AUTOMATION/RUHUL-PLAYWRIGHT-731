import { test, expect } from '@playwright/test';
import { WidgetsPage } from '../pages/WidgetsPage';

test.describe('Tool Tips Tests', () => {
  let widgetsPage: WidgetsPage;

  test.beforeEach(async ({ page }) => {
    widgetsPage = new WidgetsPage(page);
    await widgetsPage.navigateToToolTips();
  });

  test('Verify tooltip is displayed on hover', async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);
    await widgetsPage.navigateToToolTips();

    await widgetsPage.hoverOverToolTip();

    await expect(await widgetsPage.isToolTipVisible()).toBeTruthy();
  });

  test('Get tooltip text content', async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);
    await widgetsPage.navigateToToolTips();

    await widgetsPage.hoverOverToolTip();

    const toolTipText = await widgetsPage.getToolTipText();
    expect(toolTipText.length).toBeGreaterThan(0);
  });
});
