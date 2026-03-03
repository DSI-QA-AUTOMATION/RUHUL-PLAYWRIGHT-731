import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class LinksPage extends BasePage {
  private homeLink = 'a:has-text("Home")';
  private createdLink = '#created';
  private noContentLink = '#no-content';
  private movedLink = '#moved';
  private badRequestLink = '#bad-request';
  private linkResponse = '#linkResponse';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/links');
  }

  async clickHomeLink(): Promise<void> {
    await this.page.click(this.homeLink);
  }

  async clickCreatedLink(): Promise<void> {
    await this.page.click(this.createdLink);
  }

  async clickNoContentLink(): Promise<void> {
    await this.page.click(this.noContentLink);
  }

  async clickMovedLink(): Promise<void> {
    await this.page.click(this.movedLink);
  }

  async clickBadRequestLink(): Promise<void> {
    await this.page.click(this.badRequestLink);
  }

  async getLinkResponse(): Promise<string> {
    return await this.getText(this.linkResponse);
  }
}
