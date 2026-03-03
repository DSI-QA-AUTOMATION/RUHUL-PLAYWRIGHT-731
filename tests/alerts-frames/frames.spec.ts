import { test, expect } from '@playwright/test';
import { FramesPage } from '../pages/FramesPage';

test.describe('Frames Tests', () => {
  let framesPage: FramesPage;

  test.beforeEach(async ({ page }) => {
    framesPage = new FramesPage(page);
    await framesPage.navigate();
  });

  test('Switch to frame 1 and verify content', async ({ page }) => {
    const framesPage = new FramesPage(page);
    await framesPage.navigate();

    const frameContent = await framesPage.getFrame1Content();
    expect(frameContent).toContain('This is a sample page');
  });

  test('Switch to frame 2 and verify content', async ({ page }) => {
    const framesPage = new FramesPage(page);
    await framesPage.navigate();

    const frameContent = await framesPage.getFrame2Content();
    expect(frameContent).toContain('This is a sample page');
  });
});
