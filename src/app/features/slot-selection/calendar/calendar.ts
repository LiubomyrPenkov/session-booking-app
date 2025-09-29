import { CommonModule } from '@angular/common';
import { Component, input, output, computed } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormatTimezonePipe } from '@app/core/pipes/format-timezone.pipe';
import { parseISO } from 'date-fns';

import { LoadingSpinner } from '@core/components/loading-spinner';
import type { DateAvailability, SessionPage } from '@core/types';
import { formatDateString, isPastDate } from '@core/utils/date.utils';

import { CalendarHeader } from './calendar-header/calendar-header';
import { FullCalendarGridDirective } from './full-calendar-grid.directive';

@Component({
  selector: 'app-calendar',
  imports: [
    CommonModule,
    MatDatepickerModule,
    FullCalendarGridDirective,
    LoadingSpinner,
    FormatTimezonePipe,
  ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
  customHeaderComponent = CalendarHeader;

  availabilityData = input<DateAvailability[]>([]);
  selectedDate = input<string>(null);
  sessionData = input<SessionPage>();

  dateSelected = output<Date>();

  today = computed(() => {
    return new Date();
  });

  selectedDateObject = computed(() => {
    const dateStr = this.selectedDate();
    if (!dateStr) {
      return null;
    }

    return parseISO(dateStr);
  });

  dateFilter = (date: Date): boolean => {
    if (!date) {
      return false;
    }

    const dateString = formatDateString(date);

    if (isPastDate(dateString)) {
      return false;
    }

    const availability = this.availabilityData();

    if (availability.length === 0) {
      return false;
    }

    const isAvailable = availability.some(item => item.date === dateString);

    return isAvailable;
  };

  onDateSelected(date: Date) {
    this.dateSelected.emit(date);
  }
}
