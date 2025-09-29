import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormatTimezonePipe } from '@app/core/pipes/format-timezone.pipe';
import { MockFormatTimezonePipe } from '@app/core/testing/pipes';
import { parseISO } from 'date-fns';

import { LoadingSpinner } from '@core/components/loading-spinner';
import { MockLoadingSpinner } from '@core/testing/components/components.mock';
import type { DateAvailability, SessionPage } from '@core/types';

import { Calendar } from './calendar';
import { FullCalendarGridDirective } from './full-calendar-grid.directive';

describe('Calendar', () => {
  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;

  const mockAvailability: DateAvailability[] = [
    {
      date: '2025-12-15',
      times: [
        { start: '09:00', end: '10:00' },
        { start: '14:00', end: '15:00' },
      ],
    },
  ];

  const mockSession: SessionPage = {
    date: '2025-12-15',
    time: '09:00',
    duration: 60,
    host: {
      photo: 'host-photo.jpg',
      firstName: 'John',
      lastName: 'Doe',
      profession: 'Consultant',
    },
    user: {
      email: 'user@test.com',
      firstName: 'Jane',
      lastName: 'Smith',
      timeZone: 'America/New_York',
    },
    service: {
      title: 'Test Service',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calendar, MatDatepickerModule, MatNativeDateModule],
      providers: [],
    })
      .overrideComponent(Calendar, {
        remove: {
          imports: [
            LoadingSpinner,
            FullCalendarGridDirective,
            FormatTimezonePipe,
          ],
        },
        add: { imports: [MockLoadingSpinner, MockFormatTimezonePipe] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('today computed property', () => {
    it('should return current date', () => {
      const today = component.today();
      const actualToday = new Date();

      expect(today.getDate()).toBe(actualToday.getDate());
      expect(today.getMonth()).toBe(actualToday.getMonth());
      expect(today.getFullYear()).toBe(actualToday.getFullYear());
    });
  });

  describe('selectedDateObject computed property', () => {
    it('should return null when no date is selected', () => {
      fixture.componentRef.setInput('selectedDate', null);

      expect(component.selectedDateObject()).toBeNull();
    });

    it('should return parsed Date object when date string is provided', () => {
      const testDateString = '2024-01-15';
      fixture.componentRef.setInput('selectedDate', testDateString);

      const result = component.selectedDateObject();
      const expectedDate = parseISO(testDateString);

      expect(result).toEqual(expectedDate);
    });
  });

  describe('dateFilter method', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('availabilityData', mockAvailability);
    });

    it('should return false for null/undefined date', () => {
      expect(component.dateFilter(null)).toBe(false);
      expect(component.dateFilter(undefined as any)).toBe(false);
    });

    it('should return false for past dates', () => {
      const pastDate = new Date(2020, 0, 1);
      expect(component.dateFilter(pastDate)).toBe(false);
    });

    it('should return false when no availability data', () => {
      fixture.componentRef.setInput('availabilityData', []);
      const futureDate = new Date(2025, 11, 20);
      expect(component.dateFilter(futureDate)).toBe(false);
    });

    it('should return true for available future dates', () => {
      const availableDate = new Date(2025, 11, 15); // Dec 15, 2025
      expect(component.dateFilter(availableDate)).toBe(true);
    });

    it('should return false for unavailable future dates', () => {
      const unavailableDate = new Date(2025, 11, 25); // Dec 25, 2025
      expect(component.dateFilter(unavailableDate)).toBe(false);
    });
  });

  describe('onDateSelected method', () => {
    it('should emit dateSelected event with the selected date', () => {
      spyOn(component.dateSelected, 'emit');
      const testDate = new Date(2024, 0, 15);

      component.onDateSelected(testDate);

      expect(component.dateSelected.emit).toHaveBeenCalledWith(testDate);
    });
  });

  describe('template rendering', () => {
    it('should show loading spinner when no data', () => {
      fixture.componentRef.setInput('availabilityData', []);
      fixture.detectChanges();

      const spinner = fixture.nativeElement.querySelector(
        'app-loading-spinner'
      );
      expect(spinner).toBeTruthy();
    });

    it('should display correct header text', () => {
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector(
        '.session-calendar__title'
      );
      const subtitle = fixture.nativeElement.querySelector(
        '.session-calendar__subtitle'
      );

      expect(title.textContent.trim()).toBe('Select date:');
      expect(subtitle.textContent.trim()).toBe(
        'Select a date to see the available time slots on that day'
      );
    });
  });

  describe('component inputs', () => {
    it('should accept availabilityData input', () => {
      fixture.componentRef.setInput('availabilityData', mockAvailability);
      expect(component.availabilityData()).toEqual(mockAvailability);
    });

    it('should accept selectedDate input', () => {
      fixture.componentRef.setInput('selectedDate', '2025-12-15');
      expect(component.selectedDate()).toBe('2025-12-15');
    });

    it('should accept sessionData input', () => {
      fixture.componentRef.setInput('sessionData', mockSession);
      expect(component.sessionData()).toEqual(mockSession);
    });
  });
});
