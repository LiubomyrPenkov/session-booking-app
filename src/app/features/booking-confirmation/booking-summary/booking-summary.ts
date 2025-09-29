import { Component, input } from '@angular/core';
import { FormatSelectedDatePipe } from '@app/core/pipes/format-selected-date.pipe';
import { FormatTimezonePipe } from '@app/core/pipes/format-timezone.pipe';

import { FormatTimeRangePipe } from '@core/pipes/format-time-range.pipe';
import type { TimeRange, SessionPage } from '@core/types';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.html',
  styleUrl: './booking-summary.scss',
  imports: [FormatSelectedDatePipe, FormatTimezonePipe, FormatTimeRangePipe],
})
export class BookingSummary {
  selectedDate = input<string | null>();
  selectedTime = input<TimeRange | null>();
  sessionData = input<SessionPage | null>();
}
