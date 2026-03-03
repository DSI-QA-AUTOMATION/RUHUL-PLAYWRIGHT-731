import { test, expect } from '@playwright/test';
import { LinksPage } from '../pages/LinksPage';

test.describe('Links Tests', () => {
  let linksPage: LinksPage;

  test.beforeEach(async ({ page }) => {
    linksPage = new LinksPage(page);
    await linksPage.navigate();
  });

  test('Verify Home link navigation', async ({ page }) => {
    const linksPage = new LinksPage(page);
    await linksPage.navigate();

    await linksPage.clickHomeLink();

    await expect(page).toHaveURL(/demoqa/);
  });

  test('Verify created link response', async ({ page }) => {
    const linksPage = new LinksPage(page);
    await linksPage.navigate();

    await linksPage.clickCreatedLink();

    const response = await linksPage.getLinkResponse();
    expect(response).toContain('Created');
  });

  test('Verify no content link response', async ({ page }) => {
    const linksPage = new LinksPage(page);
    await linksPage.navigate();

    await linksPage.clickNoContentLink();

    const response = await linksPage.getLinkResponse();
    expect(response).toContain('No Content');
  });
});
