import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';

test.describe('Practice Form Tests', () => {
  let practiceFormPage: PracticeFormPage;

  test.beforeEach(async ({ page }) => {
    practiceFormPage = new PracticeFormPage(page);
    await practiceFormPage.navigate();
  });

  test('Submit complete form with mandatory fields', async ({ page }) => {
    const practiceFormPage = new PracticeFormPage(page);
    await practiceFormPage.navigate();

    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      mobile: '1234567890',
      gender: 'Male' as const,
      dateOfBirth: '15 May 1990',
      address: '123 Main Street, New York'
    };

    await practiceFormPage.fillForm(formData.firstName, formData.lastName, formData.email, formData.mobile);
    await practiceFormPage.selectGender(formData.gender);
    await practiceFormPage.enterDateOfBirth(formData.dateOfBirth);
    await practiceFormPage.fillAddress(formData.address);

    await practiceFormPage.submit();

    await expect(practiceFormPage.isModalVisible()).toBeTruthy();
    const modalTitle = await practiceFormPage.getModalTitle();
    expect(modalTitle).toContain('Thanks for submitting the form');
  });

  test('Fill form with all fields', async ({ page }) => {
    const practiceFormPage = new PracticeFormPage(page);
    await practiceFormPage.navigate();

    await practiceFormPage.fillForm('Jane', 'Smith', 'jane.smith@example.com', '9876543210');
    await practiceFormPage.selectGender('Female');
    await practiceFormPage.enterDateOfBirth('20 Jan 1995');
    await practiceFormPage.addSubject('Computer Science');
    await practiceFormPage.selectHobby(0);
    await practiceFormPage.fillAddress('456 Oak Avenue');
    await practiceFormPage.selectState('NCR');
    await practiceFormPage.selectCity('Delhi');

    await practiceFormPage.submit();

    await expect(practiceFormPage.isModalVisible()).toBeTruthy();
  });
});
