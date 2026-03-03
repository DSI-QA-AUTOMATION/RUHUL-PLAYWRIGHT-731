import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class HomePage extends BasePage {
  private elementsCard = 'h5:has-text("Elements")';
  private formsCard = 'h5:has-text("Forms")';
  private alertsFrameWindowsCard = 'h5:has-text("Alerts, Frames & Windows")';
  private widgetsCard = 'h5:has-text("Widgets")';
  private interactionsCard = 'h5:has-text("Interactions")';
  private bookStoreApplicationCard = 'h5:has-text("Book Store Application")';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/');
  }

  async isElementsCardVisible(): Promise<boolean> {
    return await this.isVisible(this.elementsCard);
  }

  async isFormsCardVisible(): Promise<boolean> {
    return await this.isVisible(this.formsCard);
  }

  async isAlertsFrameWindowsCardVisible(): Promise<boolean> {
    return await this.isVisible(this.alertsFrameWindowsCard);
  }

  async isWidgetsCardVisible(): Promise<boolean> {
    return await this.isVisible(this.widgetsCard);
  }

  async isInteractionsCardVisible(): Promise<boolean> {
    return await this.isVisible(this.interactionsCard);
  }

  async isBookStoreApplicationCardVisible(): Promise<boolean> {
    return await this.isVisible(this.bookStoreApplicationCard);
  }

  async clickElementsCard(): Promise<void> {
    await this.page.click(this.elementsCard);
  }

  async clickFormsCard(): Promise<void> {
    await this.page.click(this.formsCard);
  }

  async clickAlertsFrameWindowsCard(): Promise<void> {
    await this.page.click(this.alertsFrameWindowsCard);
  }

  async clickWidgetsCard(): Promise<void> {
    await this.page.click(this.widgetsCard);
  }

  async clickInteractionsCard(): Promise<void> {
    await this.page.click(this.interactionsCard);
  }
}
