import { test, expect } from '@playwright/test';
import { BookingFlowPage } from './pages/booking-flow.page';
import { TestUtils } from './utils/test-utils';

test.describe('Complete Booking User Journey', () => {
  test('user completes full booking journey: date → time → confirmation → success', async ({ page }) => {
    // Setup API mocks for consistent testing
    await TestUtils.mockApiCalls(page);
    
    const bookingPage = new BookingFlowPage(page);
    
    // Step 1: User lands on initial page
    await test.step('User navigates to booking page', async () => {
      await bookingPage.navigateToBooking();
      
      // Verify initial state - should show calendar
      await expect(bookingPage.calendarContainer).toBeVisible();
      await expect(page.locator('h1')).toContainText('Schedule session');
      
      // Verify time selection is not shown yet
      await expect(bookingPage.timeSelectionContainer).not.toBeVisible();
    });

    // Step 2: User selects a date
    await test.step('User selects an available date', async () => {
      await bookingPage.selectFirstAvailableDate();
      
      // Verify time selection appears after date selection
      await expect(bookingPage.timeSelectionContainer).toBeVisible();
      await expect(page.locator('.time-selection__title')).toContainText('Select time');
      
      // Verify URL reflects the booking state
      await expect(page).toHaveURL(/\/booking\/slots/);
      
      // Verify selected date is displayed
      const selectedDate = await bookingPage.getSelectedDate();
      expect(selectedDate).toBeTruthy();
      console.log('Selected date:', selectedDate);
    });

    // Step 3: User selects a time
    await test.step('User selects an available time slot', async () => {
      // Verify time slots are available
      const timeSlots = page.locator('.time-selection__slot');
      await expect(timeSlots.first()).toBeVisible();
      
      // Get the selected time for verification later
      const firstTimeSlot = await timeSlots.first().textContent();
      console.log('Selecting time slot:', firstTimeSlot);
      
      await bookingPage.selectTime();
    });

    // Step 4: User gets redirected to confirmation page
    await test.step('User is redirected to confirmation page', async () => {
      // Verify navigation to confirmation page
      await expect(page).toHaveURL(/\/booking\/confirmation/);
      await expect(bookingPage.confirmationContainer).toBeVisible();
      
      // Verify booking summary is displayed
      await expect(page.locator('.booking-summary')).toBeVisible();
      
      // Session details are hidden on mobile viewport but shown on desktop
      const viewport = page.viewportSize();
      const isMobile = viewport ? viewport.width < 960 : false;
      
      if (isMobile) {
        // On mobile, session details should be hidden
        await expect(page.locator('.session-details')).toBeHidden();
      } else {
        // On desktop, session details should be visible
        await expect(page.locator('.session-details')).toBeVisible();
      }
      
      // Verify confirmation button is present
      await expect(page.locator('button:has-text("Confirm")')).toBeVisible();
    });

    // Step 5: User clicks confirm
    await test.step('User confirms the booking', async () => {
      await bookingPage.confirmBooking();
    });

    // Step 6: User gets redirected to success page
    await test.step('User is redirected to booking success page', async () => {
      // Verify navigation to success page
      await expect(page).toHaveURL(/\/booking-success/);
      await expect(bookingPage.successContainer).toBeVisible();
      
      // Verify success message
      const successMessage = await bookingPage.getSuccessMessage();
      expect(successMessage).toContain('Booking Successful');
      console.log('Success message:', successMessage);
      
      // Verify completion page elements
      await expect(page.locator('.completion__icon')).toBeVisible();
      await expect(page.locator('.completion__host-profile')).toBeVisible();
      await expect(page.locator('.completion__cta')).toBeVisible();
      await expect(page.locator('.completion__cta-button')).toContainText('Join Vibly');
      
      // Verify external link attributes
      const ctaButton = page.locator('.completion__cta-button');
      await expect(ctaButton).toHaveAttribute('href', 'https://vibly.io');
      await expect(ctaButton).toHaveAttribute('target', '_blank');
      await expect(ctaButton).toHaveAttribute('rel', 'noopener noreferrer');
    });

    // Take a screenshot of the final success state
    await TestUtils.takeScreenshot(page, 'booking-success-final');
  });

});