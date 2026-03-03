import { test, expect } from '@playwright/test';

test.describe('Date Picker Tests', () => {
  test('Select a valid date', async ({ page }) => {
    await page.goto('https://demoqa.com/date-picker');
    
    // Click the date input to open calendar
    await page.click('#datePickerMonthYearInput');
    
    // Wait for calendar
    await page.waitForSelector('.react-datepicker__month-select');
    
    // Select month (January = 0)
    await page.selectOption('.react-datepicker__month-select', '0');
    
    // Select year
    await page.selectOption('.react-datepicker__year-select', '2025');
    
    // Select day
    await page.click('.react-datepicker__day--015');
    
    // Verify date was selected
    const value = await page.inputValue('#datePickerMonthYearInput');
    expect(value).toContain('15');
    expect(value).toContain('2025');
  });

  test('Select different month and year', async ({ page }) => {
    await page.goto('https://demoqa.com/date-picker');
    
    // Click the date input to open calendar
    await page.click('#datePickerMonthYearInput');
    
    // Wait for calendar
    await page.waitForSelector('.react-datepicker__month-select');
    
    // Select June (month = 5)
    await page.selectOption('.react-datepicker__month-select', '5');
    
    // Select year 2026
    await page.selectOption('.react-datepicker__year-select', '2026');
    
    // Select day 20
    await page.click('.react-datepicker__day--020');
    
    // Verify date was selected
    const value = await page.inputValue('#datePickerMonthYearInput');
    expect(value).toContain('20');
    expect(value).toContain('2026');
  });
});
