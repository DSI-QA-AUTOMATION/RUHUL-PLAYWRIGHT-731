import { test, expect } from '@playwright/test';
import { RadioButtonPage } from '../../pages/RadioButtonPage';

test.describe('Radio Button Tests', () => {
  let radioButtonPage: RadioButtonPage;

  test.beforeEach(async ({ page }) => {
    radioButtonPage = new RadioButtonPage(page);
    await radioButtonPage.navigate();
  });

  test('Select radio button Yes', async ({ page }) => {
    const radioButtonPage = new RadioButtonPage(page);
    await radioButtonPage.navigate();

    await radioButtonPage.selectYes();

    const message = await radioButtonPage.getSelectionMessage();
    expect(message).toContain('Yes');
  });

  test('Select radio button Impressive', async ({ page }) => {
    const radioButtonPage = new RadioButtonPage(page);
    await radioButtonPage.navigate();

    await radioButtonPage.selectImpressive();

    const message = await radioButtonPage.getSelectionMessage();
    expect(message).toContain('Impressive');
  });
});
