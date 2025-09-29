import { Component, inject, computed } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { BookingService } from '../../services/booking.service';

export enum HeaderTitle {
  SCHEDULE_SESSION = 'Schedule session',
  SESSION_SCHEDULED = 'Session scheduled',
}

@Component({
  selector: 'app-header',
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
  imports: [MatIcon],
})
export class AppHeader {
  private bookingService = inject(BookingService);

  headerTitle = computed(() =>
    this.bookingService.bookingCompleted()
      ? HeaderTitle.SESSION_SCHEDULED
      : HeaderTitle.SCHEDULE_SESSION
  );
}
