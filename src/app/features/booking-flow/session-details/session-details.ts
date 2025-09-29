import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { HostProfile } from '@core/components/host-profile';
import { BookingService } from '@core/services/booking.service';

@Component({
  selector: 'app-session-details',
  imports: [MatIcon, HostProfile, NgTemplateOutlet],
  templateUrl: './session-details.html',
  styleUrl: './session-details.scss',
})
export class SessionDetails {
  private bookingService = inject(BookingService);

  sessionData = this.bookingService.sessionData;
}
