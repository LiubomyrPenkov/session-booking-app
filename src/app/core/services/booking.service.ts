import { Injectable, signal, inject, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';

import { TimeRange } from '../types';
import { ApiService } from './api.service';
import { TimeSlotService } from './time-slot.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiService = inject(ApiService);
  private timeSlotService = inject(TimeSlotService);
  private sessionId = signal<string>('a1b2c3d4-e5f6-4789-a123-456789abcdef');
  private userId = signal<string>('f1e2d3c4-b5a6-4987-b321-fedcba987654');

  selectedDate = signal<string>(null);
  selectedTime = signal<TimeRange>(null);

  sessionData = toSignal(
    toObservable(this.sessionId).pipe(
      switchMap((id: string) => this.apiService.getSessionPage(id))
    )
  );

  availabilityData = toSignal(
    toObservable(this.userId).pipe(
      switchMap((userId: string) =>
        this.apiService.getAvailableDateTimes(userId)
      )
    )
  );

  availableTimeSlotsForSelectedDate = computed(() => {
    const selectedDate = this.selectedDate();
    const availabilityData = this.availabilityData();
    const sessionData = this.sessionData();

    if (!selectedDate || !availabilityData || !sessionData) {
      return [];
    }

    const dateAvailability = availabilityData.find(
      data => data.date === selectedDate
    );

    if (!dateAvailability) {
      return [];
    }

    return this.timeSlotService.generateBookableTimeSlots(
      dateAvailability.times,
      sessionData.duration
    );
  });

  bookingCompleted = signal<boolean>(false);

  setSelectedDate(date: string): void {
    this.selectedDate.set(date);
    this.selectedTime.set(null);
  }

  setSelectedTime(timeString: string): void {
    const sessionData = this.sessionData();
    if (!sessionData) {
      return;
    }

    const timeRange = this.timeSlotService.createTimeRange(
      timeString,
      sessionData.duration
    );
    this.selectedTime.set(timeRange);
  }

  confirmBooking(): void {
    this.bookingCompleted.set(true);
  }

  resetBooking(): void {
    this.selectedTime.set(null);
    this.bookingCompleted.set(false);
  }
}
