import { Component, computed, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormatTimezonePipe } from '@app/core/pipes/format-timezone.pipe';
import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';

import { FormatSelectedDatePipe } from '@core/pipes/format-selected-date.pipe';
import { FormatTimePipe } from '@core/pipes/format-time.pipe';
import type { SessionPage, TimeRange } from '@core/types';

@Component({
  selector: 'app-time-selection',
  imports: [
    MatIcon,
    FormatSelectedDatePipe,
    FormatTimePipe,
    FormatTimezonePipe,
  ],
  templateUrl: './time-selection.html',
  styleUrl: './time-selection.scss',
})
export class TimeSelection {
  selectedDate = input<string>(null);
  selectedTime = input<TimeRange>(null);
  availableTimeSlots = input<string[]>([]);
  sessionData = input<SessionPage>();

  timeSelected = output<string>();
  backButtonClicked = output<void>();

  currentTime = computed(() =>
    format(TZDate.tz(this.sessionData().user.timeZone), 'hh:mm')
  );

  onTimeSelected(timeString: string): void {
    this.timeSelected.emit(timeString);
  }

  onIconClick(): void {
    this.backButtonClicked.emit();
  }
}
