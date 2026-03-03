import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class TextBoxPage extends BasePage {
  private fullNameInput = '#userName';
  private emailInput = '#userEmail';
  private currentAddressInput = '#currentAddress';
  private permanentAddressInput = '#permanentAddress';
  private submitButton = '#submit';
  private outputSection = '#output';
  private nameOutput = '#name';
  private emailOutput = '#email';
  private currentAddressOutput = '#currentAddress';
  private permanentAddressOutput = '#permanentAddress';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/text-box');
  }

  async fillForm(fullName: string, email: string, currentAddress: string, permanentAddress: string): Promise<void> {
    await this.page.fill(this.fullNameInput, fullName);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.currentAddressInput, currentAddress);
    await this.page.fill(this.permanentAddressInput, permanentAddress);
  }

  async submit(): Promise<void> {
    await this.page.click(this.submitButton);
  }

  async getOutputName(): Promise<string> {
    return await this.getText(this.nameOutput);
  }

  async getOutputEmail(): Promise<string> {
    return await this.getText(this.emailOutput);
  }

  async getOutputCurrentAddress(): Promise<string> {
    return await this.getText(this.currentAddressOutput);
  }

  async getOutputPermanentAddress(): Promise<string> {
    return await this.getText(this.permanentAddressOutput);
  }

  async isOutputVisible(): Promise<boolean> {
    return await this.isVisible(this.outputSection);
  }
}
