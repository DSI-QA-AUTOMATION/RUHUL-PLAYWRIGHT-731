import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TextBoxPage } from '../pages/TextBoxPage';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { WidgetsPage } from '../pages/WidgetsPage';
import { InteractionsPage } from '../pages/InteractionsPage';

test.describe('End-to-End Tests', () => {
  test('Complete user journey - Navigate through forms, widgets and interactions', async ({ page }) => {
    const homePage = new HomePage(page);
    const textBoxPage = new TextBoxPage(page);
    const practiceFormPage = new PracticeFormPage(page);
    const widgetsPage = new WidgetsPage(page);
    const interactionsPage = new InteractionsPage(page);

    await homePage.navigate();
    await expect(homePage.isElementsCardVisible()).toBeTruthy();
    await expect(homePage.isFormsCardVisible()).toBeTruthy();
    await expect(homePage.isWidgetsCardVisible()).toBeTruthy();
    await expect(homePage.isInteractionsCardVisible()).toBeTruthy();

    await textBoxPage.navigate();
    await textBoxPage.fillForm('John Doe', 'john.doe@example.com', '123 Main Street', '456 Oak Ave');
    await textBoxPage.submit();
    await expect(await textBoxPage.isOutputVisible()).toBeTruthy();

    await practiceFormPage.navigate();
    await practiceFormPage.fillForm('Jane', 'Smith', 'jane.smith@example.com', '1234567890');
    await practiceFormPage.selectGender('Female');
    await practiceFormPage.submit();
    await expect(await practiceFormPage.isModalVisible()).toBeTruthy();
    await practiceFormPage.closeModal();

    await widgetsPage.navigateToDatePicker();
    await widgetsPage.selectDate('0', '2025', '15');
    const selectedDate = await widgetsPage.getSelectedDate();
    expect(selectedDate).toContain('2025');

    await widgetsPage.navigateToToolTips();
    await widgetsPage.hoverOverToolTip();
    await expect(await widgetsPage.isToolTipVisible()).toBeTruthy();

    await interactionsPage.navigateToDragDrop();
    await interactionsPage.dragElementToTarget();
    const droppableText = await interactionsPage.getDroppableText();
    expect(droppableText).toContain('Dropped');
  });
});
