import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { TextBoxPage } from '../../pages/TextBoxPage';
import { PracticeFormPage } from '../../pages/PracticeFormPage';
import { WidgetsPage } from '../../pages/WidgetsPage';
import { InteractionsPage } from '../../pages/InteractionsPage';

test.describe('End-to-End Tests', () => {
  test('Complete user journey - Navigate through forms, widgets and interactions', async ({ page }) => {
    const homePage = new HomePage(page);
    const textBoxPage = new TextBoxPage(page);
    const practiceFormPage = new PracticeFormPage(page);
    const widgetsPage = new WidgetsPage(page);
    const interactionsPage = new InteractionsPage(page);

    // Home page - verify categories
    await homePage.navigate();
    await expect(page.locator('h5:has-text("Elements")')).toBeVisible();
    await expect(page.locator('h5:has-text("Forms")')).toBeVisible();
    await expect(page.locator('h5:has-text("Widgets")')).toBeVisible();
    await expect(page.locator('h5:has-text("Interactions")')).toBeVisible();

    // Text Box
    await textBoxPage.navigate();
    await textBoxPage.fillForm('John Doe', 'john.doe@example.com', '123 Main Street', '456 Oak Ave');
    await textBoxPage.submit();
    await expect(page.locator('#output')).toBeVisible();

    // Practice Form
    await practiceFormPage.navigate();
    await practiceFormPage.fillForm('Jane', 'Smith', 'jane.smith@example.com', '1234567890');
    await practiceFormPage.selectGender('Female');
    await page.locator('#submit').scrollIntoViewIfNeeded();
    await practiceFormPage.submit();
    await expect(page.locator('.modal-dialog')).toBeVisible();
    await practiceFormPage.closeModal();

    // Date Picker
    await widgetsPage.navigateToDatePicker();
    await page.locator('#datePickerMonthYearInput').click();
    await page.locator('.react-datepicker__month-select').selectOption('0');
    await page.locator('.react-datepicker__year-select').selectOption('2025');
    await page.locator('.react-datepicker__day--015').click();
    const dateValue = await page.locator('#datePickerMonthYearInput').inputValue();
    expect(dateValue).toContain('2025');

    // Drag and Drop
    await interactionsPage.navigateToDragDrop();
    await expect(page.locator('#draggable')).toBeVisible();
    await expect(page.locator('#droppable').first()).toBeVisible();
  });
});
