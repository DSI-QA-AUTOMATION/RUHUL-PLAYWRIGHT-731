import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class InteractionsPage extends BasePage {
  private draggableElement = '#draggable';
  private droppableElement = '#droppable';
  private sortableLink = '#menu-item:last-child';
  private dragAndDropLink = '#menu-item:last-child';

  constructor(page: Page) {
    super(page);
  }

  async navigateToDragDrop(): Promise<void> {
    await this.navigateTo('/droppable');
  }

  async navigateToSortable(): Promise<void> {
    await this.navigateTo('/sortable');
  }

  async dragElementToTarget(): Promise<void> {
    const draggable = this.page.locator(this.draggableElement);
    const droppable = this.page.locator(this.droppableElement).first(); // Use .first() to resolve strict mode
    await draggable.dragTo(droppable);
  }

  async getDroppableText(): Promise<string> {
    return await this.getText(this.droppableElement + ':first-of-type');
  }

  async getDroppableBackgroundColor(): Promise<string> {
    return await this.page.$eval(this.droppableElement, el => {
      const style = window.getComputedStyle(el);
      return style.backgroundColor;
    });
  }
}
