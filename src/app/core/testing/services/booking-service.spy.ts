import { signal, computed } from '@angular/core';

import { BookingService } from '../../services/booking.service';

export function createBookingServiceSpy() {
  const sessionDataSignal = signal(null);
  const availabilityDataSignal = signal(null);

  return jasmine.createSpyObj<BookingService>(
    'BookingService',
    ['setSelectedDate', 'setSelectedTime', 'confirmBooking', 'resetBooking'],
    {
      selectedDate: signal(null),
      selectedTime: signal(null),
      bookingCompleted: signal(false),
      sessionData: sessionDataSignal,
      availabilityData: availabilityDataSignal,
      availableTimeSlotsForSelectedDate: computed((): string[] => []),
    }
  );
}
