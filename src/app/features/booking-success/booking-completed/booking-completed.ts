import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { HostProfile } from '@core/components/host-profile';
import { BookingService } from '@core/services/booking.service';

@Component({
  selector: 'app-booking-completed',
  imports: [MatIcon, HostProfile],
  templateUrl: './booking-completed.html',
  styleUrl: './booking-completed.scss',
})
export class BookingCompleted {
  private bookingService = inject(BookingService);

  sessionData = this.bookingService.sessionData;
}
