import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { BookingService } from '@core/services/booking.service';
import { formatDateString } from '@core/utils/date.utils';

import { Calendar } from '../calendar';
import { TimeSelection } from '../time-selection';

@Component({
  selector: 'app-date-time-selector',
  imports: [Calendar, TimeSelection],
  templateUrl: './date-time-selector.html',
  styleUrls: ['./date-time-selector.scss'],
})
export class DateTimeSelector {
  private readonly bookingService = inject(BookingService);
  private readonly router = inject(Router);

  readonly sessionData = this.bookingService.sessionData;
  readonly availabilityData = this.bookingService.availabilityData;
  readonly selectedDate = this.bookingService.selectedDate;
  readonly selectedTime = this.bookingService.selectedTime;
  readonly availableTimeSlots =
    this.bookingService.availableTimeSlotsForSelectedDate;

  onDateSelected(date: Date): void {
    if (!date) {
      return;
    }

    const dateString = formatDateString(date);
    if (!dateString) {
      return;
    }

    this.bookingService.setSelectedDate(dateString);
  }

  onTimeSelected(timeString: string): void {
    this.bookingService.setSelectedTime(timeString);

    if (this.selectedDate() && timeString) {
      this.router.navigate(['/booking/confirmation']);
    }
  }

  onBackButtonClicked(): void {
    this.bookingService.setSelectedDate(null);
  }
}
