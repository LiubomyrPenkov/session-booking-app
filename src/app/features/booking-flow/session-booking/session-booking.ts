import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoadingSpinner } from '@core/components/loading-spinner';
import { BookingService } from '@core/services/booking.service';

import { SessionDetails } from '../session-details';

@Component({
  selector: 'app-session-booking',
  imports: [SessionDetails, RouterOutlet, LoadingSpinner],
  templateUrl: './session-booking.html',
  styleUrl: './session-booking.scss',
})
export class SessionBooking {
  private bookingService = inject(BookingService);

  selectedDate = this.bookingService.selectedDate;
  sessionData = this.bookingService.sessionData;
}
