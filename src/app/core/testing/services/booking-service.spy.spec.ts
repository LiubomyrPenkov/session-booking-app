import { signal } from '@angular/core';

import { BookingService } from '../../services/booking.service';

export function createBookingServiceSpy() {
  return jasmine.createSpyObj<BookingService>(
    'BookingService',
    ['setSelectedDate', 'setSelectedTime', 'confirmBooking', 'resetBooking'],
    {
      selectedDate: signal(null),
      selectedTime: signal(null),
      bookingCompleted: signal(false),
      sessionData: signal(null),
    }
  );
}
