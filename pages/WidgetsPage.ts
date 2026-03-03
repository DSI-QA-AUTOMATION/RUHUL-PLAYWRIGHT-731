import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class WidgetsPage extends BasePage {
  private dateInput = '#datePickerMonthYearInput';
  private dateSelectMonth = '.react-datepicker__month-select';
  private dateSelectYear = '.react-datepicker__year-select';
  private dateSelectDay = '.react-datepicker__day';
  private toolTipButton = 'button[title="Hover me"]';
  private toolTipContent = '.tooltip-inner';
  private toolTipElement = '.tooltip';

  constructor(page: Page) {
    super(page);
  }

  async navigateToDatePicker(): Promise<void> {
    await this.navigateTo('/date-picker');
  }

  async navigateToToolTips(): Promise<void> {
    await this.navigateTo('/tool-tips');
  }

  async selectDate(month: string, year: string, day: string): Promise<void> {
    await this.page.click(this.dateInput);
    await this.page.selectOption(this.dateSelectMonth, month);
    await this.page.selectOption(this.dateSelectYear, year);
    await this.page.click(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`);
  }

  async getSelectedDate(): Promise<string> {
    return await this.getText(this.dateInput);
  }

  async hoverOverToolTip(): Promise<void> {
    await this.page.hover(this.toolTipButton);
  }

  async getToolTipText(): Promise<string> {
    await this.page.waitForSelector(this.toolTipElement);
    return await this.getText(this.toolTipContent);
  }

  async isToolTipVisible(): Promise<boolean> {
    return await this.isVisible(this.toolTipElement);
  }
}
