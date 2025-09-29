import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiService } from './api.service';
import { BookingService } from './booking.service';
import { TimeSlotService } from './time-slot.service';
import {
  createApiServiceSpy,
  createTimeSlotServiceSpy,
} from '../testing/services';

describe('BookingService', () => {
  let service: BookingService;
  let apiService: jasmine.SpyObj<ApiService>;
  let timeSlotService: jasmine.SpyObj<TimeSlotService>;

  const mockSessionData = {
    date: '2025-09-30',
    time: '09:00',
    duration: 60,
    host: {
      photo: '',
      firstName: 'John',
      lastName: 'Doe',
      profession: 'Coach',
    },
    user: {
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      timeZone: 'UTC',
    },
    service: {
      name: 'Test Service',
      description: 'Test Description',
      title: 'Test Service',
    },
  };

  const mockAvailabilityData = [
    { date: '2025-09-30', times: [{ start: '09:00:00', end: '17:00:00' }] },
    { date: '2025-10-01', times: [{ start: '10:00:00', end: '18:00:00' }] },
  ];

  beforeEach(() => {
    const apiSpy = createApiServiceSpy();
    const timeSlotSpy = createTimeSlotServiceSpy();

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: TimeSlotService, useValue: timeSlotSpy },
      ],
    });

    service = TestBed.inject(BookingService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    timeSlotService = TestBed.inject(
      TimeSlotService
    ) as jasmine.SpyObj<TimeSlotService>;

    apiService.getSessionPage.and.returnValue(of(mockSessionData));
    apiService.getAvailableDateTimes.and.returnValue(of(mockAvailabilityData));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Date selection', () => {
    it('should set selected date', () => {
      service.setSelectedDate('2025-09-30');
      expect(service.selectedDate()).toBe('2025-09-30');
    });

    it('should reset selected time when setting new date', () => {
      service.selectedTime.set({ start: '10:00', end: '11:00' });
      expect(service.selectedTime()).toEqual({ start: '10:00', end: '11:00' });

      service.setSelectedDate('2025-09-30');

      expect(service.selectedDate()).toBe('2025-09-30');
      expect(service.selectedTime()).toBeNull();
    });
  });

  describe('Time selection', () => {
    it('should not set selected time when session data is not available', () => {
      Object.defineProperty(service, 'sessionData', {
        value: jasmine.createSpy('sessionData').and.returnValue(undefined),
      });

      service.setSelectedTime('09:00');

      expect(timeSlotService.createTimeRange).not.toHaveBeenCalled();
      expect(service.selectedTime()).toBeNull();
    });

    it('should not set selected time when session data is null', () => {
      Object.defineProperty(service, 'sessionData', {
        value: jasmine.createSpy('sessionData').and.returnValue(null),
      });

      service.setSelectedTime('09:00');

      expect(timeSlotService.createTimeRange).not.toHaveBeenCalled();
      expect(service.selectedTime()).toBeNull();
    });

    it('should set selected time when session data exists', () => {
      Object.defineProperty(service, 'sessionData', {
        value: jasmine
          .createSpy('sessionData')
          .and.returnValue(mockSessionData),
      });
      timeSlotService.createTimeRange.and.returnValue({
        start: '09:00',
        end: '10:00',
      });

      service.setSelectedTime('09:00');

      expect(timeSlotService.createTimeRange).toHaveBeenCalledWith('09:00', 60);
      expect(service.selectedTime()).toEqual({ start: '09:00', end: '10:00' });
    });
  });

  describe('Booking management', () => {
    it('should confirm booking', () => {
      expect(service.bookingCompleted()).toBe(false);

      service.confirmBooking();

      expect(service.bookingCompleted()).toBe(true);
    });

    it('should reset booking state correctly', () => {
      // Set some initial state
      service.setSelectedDate('2025-09-30');
      service.selectedTime.set({ start: '09:00', end: '10:00' });
      service.confirmBooking();

      expect(service.selectedDate()).toBe('2025-09-30');
      expect(service.selectedTime()).toEqual({ start: '09:00', end: '10:00' });
      expect(service.bookingCompleted()).toBe(true);

      service.resetBooking();

      expect(service.selectedTime()).toBeNull();
      expect(service.bookingCompleted()).toBe(false);
      // selectedDate should remain unchanged
      expect(service.selectedDate()).toBe('2025-09-30');
    });
  });
});
