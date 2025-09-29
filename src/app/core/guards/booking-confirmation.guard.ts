import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { BookingService } from '../services/booking.service';

export const bookingConfirmationGuard: CanActivateFn = () => {
  const bookingService = inject(BookingService);
  const router = inject(Router);

  const selectedDate = bookingService.selectedDate();
  const selectedTime = bookingService.selectedTime();

  if (selectedDate && selectedTime) {
    return true;
  }

  return router.parseUrl('/booking/slots');
};
