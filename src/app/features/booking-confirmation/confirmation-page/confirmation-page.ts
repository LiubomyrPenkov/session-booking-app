import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { BookingService } from '@core/services/booking.service';

import { BookingSummary } from '../booking-summary';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.html',
  styleUrl: './confirmation-page.scss',
  imports: [BookingSummary],
})
export class ConfirmationPage {
  private bookingService = inject(BookingService);
  private router = inject(Router);

  selectedDate = this.bookingService.selectedDate;
  selectedTime = this.bookingService.selectedTime;
  sessionData = this.bookingService.sessionData;

  onConfirmBooking() {
    this.bookingService.confirmBooking();
    this.router.navigate(['/booking-success']);
  }

  onGoBack() {
    this.bookingService.resetBooking();
    this.router.navigate(['/booking/slots']);
  }
}
