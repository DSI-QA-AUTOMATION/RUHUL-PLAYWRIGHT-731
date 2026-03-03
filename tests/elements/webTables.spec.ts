import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../../pages/WebTablesPage';

test.describe('Web Tables Tests', () => {
  let webTablesPage: WebTablesPage;

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigate();
  });

  test('Add new record to web table', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigate();

    const userData = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      age: '30',
      salary: '50000',
      department: 'Engineering'
    };

    await webTablesPage.clickAddButton();
    await webTablesPage.fillRegistrationForm(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.age,
      userData.salary,
      userData.department
    );
    await webTablesPage.submitForm();

    await webTablesPage.searchRecord(userData.email);
    const rows = await webTablesPage.getTableRows();
    const found = rows.some(row => row.includes(userData.firstName) && row.includes(userData.email));
    expect(found).toBeTruthy();
  });

  test('Search existing record', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigate();

    await webTablesPage.searchRecord('cierra');
    const rows = await webTablesPage.getTableRows();
    const found = rows.some(row => row.includes('cierra'));
    expect(found).toBeTruthy();
  });
});
