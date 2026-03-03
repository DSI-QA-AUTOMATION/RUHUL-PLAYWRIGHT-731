import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class AlertsPage extends BasePage {
  private alertButton = '#alertButton';
  private timerAlertButton = '#timerAlertButton';
  private confirmButton = '#confirmButton';
  private promptButton = '#promtButton';
  private confirmResult = '#confirmResult';
  private promptResult = '#promptResult';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/alerts');
  }

  async triggerAlert(): Promise<void> {
    this.page.on('dialog', dialog => dialog.accept());
    await this.page.click(this.alertButton);
  }

  async triggerTimerAlert(): Promise<void> {
    this.page.on('dialog', dialog => dialog.accept());
    await this.page.click(this.timerAlertButton);
  }

  async triggerConfirmAlert(accept: boolean = true): Promise<void> {
    this.page.on('dialog', dialog => accept ? dialog.accept() : dialog.dismiss());
    await this.page.click(this.confirmButton);
  }

  async triggerPromptAlert(text: string): Promise<void> {
    this.page.on('dialog', dialog => dialog.accept(text));
    await this.page.click(this.promptButton);
  }

  async getConfirmResult(): Promise<string> {
    return await this.getText(this.confirmResult);
  }

  async getPromptResult(): Promise<string> {
    return await this.getText(this.promptResult);
  }
}
