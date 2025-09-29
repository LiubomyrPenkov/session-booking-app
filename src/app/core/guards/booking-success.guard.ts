import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { BookingService } from '../services/booking.service';

export const bookingSuccessGuard: CanActivateFn = () => {
  const bookingService = inject(BookingService);
  const router = inject(Router);

  const bookingCompleted = bookingService.bookingCompleted();

  if (bookingCompleted) {
    return true;
  }

  return router.parseUrl('/booking/slots');
};
