import { Page, Locator } from '@playwright/test';

export class BookingFlowPage {
  readonly page: Page;
  readonly calendarContainer: Locator;
  readonly timeSelectionContainer: Locator;
  readonly confirmationContainer: Locator;
  readonly successContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.calendarContainer = page.locator('.date-time-selector');
    this.timeSelectionContainer = page.locator('.time-selection');
    this.confirmationContainer = page.locator('.booking-confirmation');
    this.successContainer = page.locator('.completion');
  }

  async navigateToBooking() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async selectDate(dayNumber: number) {
    // Wait for calendar to be visible
    await this.calendarContainer.waitFor({ state: 'visible' });
    
    // Wait directly for mat-calendar to appear (with extended timeout for deferred loading)
    await this.page.waitForSelector('mat-calendar', { state: 'visible', timeout: 60000 });
    
    // Find and click an available date (not disabled) in Angular Material calendar
    // Angular Material uses .mat-calendar-body-cell for date cells
    const availableDates = this.page.locator('mat-calendar .mat-calendar-body-cell:not(.mat-calendar-body-disabled)');
    await availableDates.nth(dayNumber).click();
    
    // Wait for time selection to appear
    await this.timeSelectionContainer.waitFor({ state: 'visible' });
  }

  async selectFirstAvailableDate() {
    await this.calendarContainer.waitFor({ state: 'visible' });
    
    // Wait directly for mat-calendar to appear (with extended timeout for deferred loading)
    await this.page.waitForSelector('mat-calendar', { state: 'visible', timeout: 60000 });
    
    // Check if there are any available dates in the current month view
    let availableDates = this.page.locator('mat-calendar .mat-calendar-body-cell:not(.mat-calendar-body-disabled)');
    let availableDatesCount = await availableDates.count();
    
    // If no available dates in current month, try navigating to next month (up to 2 attempts)
    let attempts = 0;
    while (availableDatesCount === 0 && attempts < 2) {
      console.log(`No available dates found in current calendar view, navigating to next month (attempt ${attempts + 1})`);
      
      // Click the next month button
      const nextMonthButton = this.page.locator('mat-calendar .mat-calendar-next-button');
      if (await nextMonthButton.isVisible()) {
        await nextMonthButton.click();
        
        // Wait for calendar to update
        await this.page.waitForTimeout(1000);
        availableDates = this.page.locator('mat-calendar .mat-calendar-body-cell:not(.mat-calendar-body-disabled)');
        availableDatesCount = await availableDates.count();
      }
      attempts++;
    }
    
    if (availableDatesCount === 0) {
      throw new Error('No available dates found in calendar after checking current and next month');
    }
    
    // Click the first available date
    const firstAvailableDate = availableDates.first();
    await firstAvailableDate.click();
    
    await this.timeSelectionContainer.waitFor({ state: 'visible' });
  }

  async selectTime(timeSlot?: string) {
    await this.timeSelectionContainer.waitFor({ state: 'visible' });
    
    if (timeSlot) {
      // Select specific time slot
      await this.page.locator('.time-selection__slot').filter({ hasText: timeSlot }).click();
    } else {
      // Select first available time slot
      await this.page.locator('.time-selection__slot').first().click();
    }
    
    // Wait for navigation to confirmation page
    await this.confirmationContainer.waitFor({ state: 'visible' });
  }

  async confirmBooking() {
    await this.confirmationContainer.waitFor({ state: 'visible' });
    
    // Click the confirm button - using more specific selector
    await this.page.locator('.actions__btn--confirm').click();
    
    // Wait for navigation to success page
    await this.successContainer.waitFor({ state: 'visible' });
  }

  async getSelectedDate(): Promise<string> {
    return await this.page.locator('.time-selection__date').textContent() || '';
  }

  async getSelectedTime(): Promise<string> {
    return await this.page.locator('.booking-summary__time').textContent() || '';
  }

  async isOnConfirmationPage(): Promise<boolean> {
    return await this.confirmationContainer.isVisible();
  }

  async isOnSuccessPage(): Promise<boolean> {
    return await this.successContainer.isVisible();
  }

  async getSuccessMessage(): Promise<string> {
    return await this.page.locator('.completion__title').textContent() || '';
  }

  async goBack() {
    await this.page.locator('.actions__btn--back').click();
  }

  async goBackFromTimeSelection() {
    // Click the back icon from time selection to return to calendar
    // Use evaluate to directly click the element as mat-icon can have rendering issues
    await this.page.evaluate(() => {
      const icon = document.querySelector('.time-selection__icon') as HTMLElement;
      if (icon) {
        icon.click();
      }
    });
  }

  async verifyBookingDetails() {
    // Verify date and time are displayed in confirmation
    const date = await this.getSelectedDate();
    const time = await this.getSelectedTime();
    
    return { date, time };
  }
}