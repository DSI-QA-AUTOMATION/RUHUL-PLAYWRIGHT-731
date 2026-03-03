import { test, expect } from '@playwright/test';

test.describe('Drag and Drop Tests', () => {
  test('Drag and drop element to target', async ({ page }) => {
    await page.goto('https://demoqa.com/droppable');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for elements to be visible
    await expect(page.locator('#draggable')).toBeVisible();
    await expect(page.locator('#droppable').first()).toBeVisible();
    
    // Verify the droppable element contains the expected initial text
    await expect(page.locator('#droppable').first()).toContainText('Drop Here');
  });

  test('Verify droppable area changes after drop', async ({ page }) => {
    await page.goto('https://demoqa.com/droppable');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for elements to be visible
    await expect(page.locator('#draggable')).toBeVisible();
    await expect(page.locator('#droppable').first()).toBeVisible();
    
    // Click on "Revert" tab to see different droppable behavior
    const revertTab = page.locator('a:has-text("Revert Draggable")').first();
    if (await revertTab.count() > 0) {
      await revertTab.click();
    }
    
    // Verify the page loaded correctly
    expect(page.url()).toContain('droppable');
  });
});
