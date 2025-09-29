import { Page } from '@playwright/test';

/**
 * Test utilities for common operations
 */
export class TestUtils {
  static async waitForLoadState(page: Page, state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle') {
    await page.waitForLoadState(state);
  }

  static async takeScreenshot(page: Page, name: string) {
    await page.screenshot({ path: `e2e/screenshots/${name}.png`, fullPage: true });
  }

  static async mockApiCalls(page: Page) {
    // Mock GraphQL API calls for consistent testing
    await page.route('**/graphql', async route => {
      const request = route.request();
      const postData = request.postData();
      
      // Get current date and intelligently generate test dates
      const today = new Date();
      const testDates = TestUtils.generateReliableTestDates(today);
      
      const formatDate = (date: Date) => date.toISOString().split('T')[0];
      
      if (postData?.includes('getSessionPage') || postData?.includes('GetSessionPage')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              getSessionPage: {
                date: formatDate(testDates[0]), // Use first test date
                time: '10:00',
                duration: 60,
                host: {
                  photo: '/assets/host-photo.jpg',
                  firstName: 'John',
                  lastName: 'Doe',
                  profession: 'Business Coach'
                },
                user: {
                  email: 'user@example.com',
                  firstName: 'Jane',
                  lastName: 'Smith',
                  timeZone: 'America/New_York'
                },
                service: {
                  title: 'Business Strategy Session'
                }
              }
            }
          })
        });
      } else if (postData?.includes('getAvailableDateTimes') || postData?.includes('GetAvailableDateTimes')) {
        // Generate available times for multiple days to handle month transitions
        const availableDateTimes = testDates.map((date: Date, index: number) => ({
          date: formatDate(date),
          times: [
            { start: '09:00:00', end: '10:00:00' },
            { start: '10:00:00', end: '11:00:00' },
            { start: '14:00:00', end: '15:00:00' },
            { start: '15:00:00', end: '16:00:00' }
          ].slice(0, 4 - index) // Vary available times per day
        }));
        
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              getAvailableDateTimes: availableDateTimes
            }
          })
        });
      } else {
        await route.continue();
      }
    });
  }

  static getFormattedDate(daysFromNow: number = 0): string {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  }

  /**
   * Generates reliable test dates that ensure calendar functionality works
   * regardless of month transitions
   */
  static generateReliableTestDates(today: Date): Date[] {
    const testDates: Date[] = [];
    
    // Strategy: Always include dates in the current month view
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Find remaining days in current month
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const remainingDaysInMonth = lastDayOfMonth - today.getDate();
    
    if (remainingDaysInMonth >= 3) {
      // We have enough days left in current month - use them
      for (let i = 1; i <= Math.min(5, remainingDaysInMonth); i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        testDates.push(futureDate);
      }
    } else {
      // Close to month end - use a mix of current month + next month
      // Add remaining days in current month
      for (let i = 1; i <= remainingDaysInMonth; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        testDates.push(futureDate);
      }
      
      // Add first few days of next month
      const daysNeeded = 5 - remainingDaysInMonth;
      for (let i = 1; i <= daysNeeded; i++) {
        const nextMonthDate = new Date(currentYear, currentMonth + 1, i);
        testDates.push(nextMonthDate);
      }
    }
    
    return testDates;
  }
}