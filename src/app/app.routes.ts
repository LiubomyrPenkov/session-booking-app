import { Routes } from '@angular/router';

import { bookingConfirmationGuard } from '@core/guards/booking-confirmation.guard';
import { bookingSuccessGuard } from '@core/guards/booking-success.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/booking/slots',
    pathMatch: 'full',
  },
  {
    path: 'booking',
    loadComponent: () =>
      import('@features/booking-flow/session-booking').then(
        m => m.SessionBooking
      ),
    children: [
      {
        path: '',
        redirectTo: 'slots',
        pathMatch: 'full',
      },
      {
        path: 'slots',
        loadComponent: () =>
          import('@features/slot-selection/date-time-selector').then(
            m => m.DateTimeSelector
          ),
      },
      {
        path: 'confirmation',
        loadComponent: () =>
          import('@features/booking-confirmation/confirmation-page').then(
            m => m.ConfirmationPage
          ),
        canActivate: [bookingConfirmationGuard],
        title: 'Confirm Booking',
      },
    ],
  },
  {
    path: 'booking-success',
    loadComponent: () =>
      import('@app/features/booking-success/booking-completed').then(
        m => m.BookingCompleted
      ),
    canActivate: [bookingConfirmationGuard, bookingSuccessGuard],
    title: 'Booking Complete',
  },
  {
    path: '**',
    redirectTo: '/booking/slots',
  },
];
