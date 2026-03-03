import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class WebTablesPage extends BasePage {
  private addButton = '#addNewRecordButton';
  private firstNameInput = '#firstName';
  private lastNameInput = '#lastName';
  private emailInput = '#userEmail';
  private ageInput = '#age';
  private salaryInput = '#salary';
  private departmentInput = '#department';
  private submitButton = '#submit';
  private searchInput = '#searchBox';
  private tableBody = '.rt-tbody';
  private editButton = 'span[title="Edit"]';
  private deleteButton = 'span[title="Delete"]';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/webtables');
  }

  async clickAddButton(): Promise<void> {
    await this.page.click(this.addButton);
  }

  async fillRegistrationForm(firstName: string, lastName: string, email: string, age: string, salary: string, department: string): Promise<void> {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.ageInput, age);
    await this.page.fill(this.salaryInput, salary);
    await this.page.fill(this.departmentInput, department);
  }

  async submitForm(): Promise<void> {
    await this.page.click(this.submitButton);
  }

  async searchRecord(searchText: string): Promise<void> {
    await this.page.fill(this.searchInput, searchText);
  }

  async getTableRows(): Promise<string[]> {
    // Get all visible table content by looking for cells in the ReactTable
    try {
      await this.page.waitForSelector('.ReactTable', { timeout: 5000 });
      // Get all cells or rows from the table
      const cells = await this.page.locator('.ReactTable >> [role="row"]').allTextContents();
      return cells.filter(text => text.trim()).map(text => text.trim());
    } catch (e) {
      // Fallback: try to get all text from ReactTable
      const allText = await this.page.locator('.ReactTable').textContent();
      return allText ? [allText] : [];
    }
  }

  async deleteFirstRecord(): Promise<void> {
    await this.page.click(this.deleteButton);
  }

  async editFirstRecord(): Promise<void> {
    await this.page.click(this.editButton);
  }
}
