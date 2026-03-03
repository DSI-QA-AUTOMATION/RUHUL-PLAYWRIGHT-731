import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class PracticeFormPage extends BasePage {
  private firstNameInput = '#firstName';
  private lastNameInput = '#lastName';
  private emailInput = '#userEmail';
  private maleRadioButton = 'label:has-text("Male")';
  private femaleRadioButton = 'label:has-text("Female")';
  private otherRadioButton = 'label:has-text("Other")';
  private mobileInput = '#userNumber';
  private dateOfBirthInput = '#dateOfBirthInput';
  private subjectsInput = '#subjectsInput';
  private hobbiesCheckboxes = '.custom-checkbox';
  private currentAddressInput = '#currentAddress';
  private stateSelect = '#state';
  private citySelect = '#city';
  private submitButton = '#submit';
  private modalDialog = '.modal-dialog';
  private modalTitle = '#example-modal-sizes-title-lg';
  private closeButton = '#closeLargeModal';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/automation-practice-form');
  }

  async fillForm(firstName: string, lastName: string, email: string, mobile: string): Promise<void> {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.mobileInput, mobile);
  }

  async selectGender(gender: 'Male' | 'Female' | 'Other'): Promise<void> {
    switch (gender) {
      case 'Male':
        await this.page.click(this.maleRadioButton);
        break;
      case 'Female':
        await this.page.click(this.femaleRadioButton);
        break;
      case 'Other':
        await this.page.click(this.otherRadioButton);
        break;
    }
  }

  async enterDateOfBirth(date: string): Promise<void> {
    await this.page.fill(this.dateOfBirthInput, date);
  }

  async addSubject(subject: string): Promise<void> {
    await this.page.click(this.subjectsInput);
    await this.page.fill(this.subjectsInput, subject);
    await this.page.press(this.subjectsInput, 'Enter');
  }

  async selectHobby(index: number): Promise<void> {
    const hobbies = this.page.locator(this.hobbiesCheckboxes);
    await hobbies.nth(index).click();
  }

  async fillAddress(address: string): Promise<void> {
    await this.page.fill(this.currentAddressInput, address);
  }

  async selectState(state: string): Promise<void> {
    await this.page.click(this.stateSelect);
    await this.page.click(`div:has-text("${state}")`);
  }

  async selectCity(city: string): Promise<void> {
    await this.page.click(this.citySelect);
    await this.page.click(`div:has-text("${city}")`);
  }

  async submit(): Promise<void> {
    await this.page.click(this.submitButton);
  }

  async isModalVisible(): Promise<boolean> {
    return await this.isVisible(this.modalDialog);
  }

  async getModalTitle(): Promise<string> {
    return await this.getText(this.modalTitle);
  }

  async closeModal(): Promise<void> {
    await this.page.click(this.closeButton);
  }
}
