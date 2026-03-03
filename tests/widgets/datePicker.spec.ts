import { test, expect } from '@playwright/test';
import { WidgetsPage } from '../pages/WidgetsPage';

test.describe('Date Picker Tests', () => {
  let widgetsPage: WidgetsPage;

  test.beforeEach(async ({ page }) => {
    widgetsPage = new WidgetsPage(page);
    await widgetsPage.navigateToDatePicker();
  });

  test('Select a valid date', async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);
    await widgetsPage.navigateToDatePicker();

    await widgetsPage.selectDate('0', '2025', '15');

    const selectedDate = await widgetsPage.getSelectedDate();
    expect(selectedDate).toContain('15');
    expect(selectedDate).toContain('2025');
  });

  test('Select different month and year', async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);
    await widgetsPage.navigateToDatePicker();

    await widgetsPage.selectDate('5', '2026', '20');

    const selectedDate = await widgetsPage.getSelectedDate();
    expect(selectedDate).toContain('20');
    expect(selectedDate).toContain('2026');
  });
});
