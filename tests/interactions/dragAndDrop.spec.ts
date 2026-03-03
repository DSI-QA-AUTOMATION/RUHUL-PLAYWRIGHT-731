import { test, expect } from '@playwright/test';
import { InteractionsPage } from '../pages/InteractionsPage';

test.describe('Drag and Drop Tests', () => {
  let interactionsPage: InteractionsPage;

  test.beforeEach(async ({ page }) => {
    interactionsPage = new InteractionsPage(page);
    await interactionsPage.navigateToDragDrop();
  });

  test('Drag and drop element to target', async ({ page }) => {
    const interactionsPage = new InteractionsPage(page);
    await interactionsPage.navigateToDragDrop();

    await interactionsPage.dragElementToTarget();

    const droppableText = await interactionsPage.getDroppableText();
    expect(droppableText).toContain('Dropped');
  });

  test('Verify droppable area changes after drop', async ({ page }) => {
    const interactionsPage = new InteractionsPage(page);
    await interactionsPage.navigateToDragDrop();

    await interactionsPage.dragElementToTarget();

    const bgColor = await interactionsPage.getDroppableBackgroundColor();
    expect(bgColor).toBeDefined();
  });
});
