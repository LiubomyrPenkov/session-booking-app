import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { BookingService } from '@core/services/booking.service';
import {
  MockCalendar,
  MockTimeSelection,
} from '@core/testing/components/components.mock';
import { createBookingServiceSpy } from '@core/testing/services';

import { DateTimeSelector } from './date-time-selector';
import { Calendar } from '../calendar';
import { TimeSelection } from '../time-selection';

describe('DateTimeSelector', () => {
  let component: DateTimeSelector;
  let fixture: ComponentFixture<DateTimeSelector>;
  let mockBookingService: jasmine.SpyObj<BookingService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const bookingServiceSpy = createBookingServiceSpy();
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DateTimeSelector, CommonModule],
      providers: [
        { provide: BookingService, useValue: bookingServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    })
      .overrideComponent(DateTimeSelector, {
        remove: { imports: [Calendar, TimeSelection] },
        add: { imports: [MockCalendar, MockTimeSelection] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DateTimeSelector);
    component = fixture.componentInstance;
    mockBookingService = TestBed.inject(
      BookingService
    ) as jasmine.SpyObj<BookingService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDateSelected', () => {
    it('should return early if date is null', () => {
      component.onDateSelected(null as any);
      expect(mockBookingService.setSelectedDate).not.toHaveBeenCalled();
    });

    it('should format date and call setSelectedDate', () => {
      const testDate = new Date(2024, 0, 15); // January 15, 2024
      component.onDateSelected(testDate);
      expect(mockBookingService.setSelectedDate).toHaveBeenCalledWith(
        '2024-01-15'
      );
    });
  });

  describe('onTimeSelected', () => {
    it('should call setSelectedTime and navigate when date is selected', () => {
      mockBookingService.selectedDate.set('2024-01-15');
      component.onTimeSelected('10:00');

      expect(mockBookingService.setSelectedTime).toHaveBeenCalledWith('10:00');
      expect(mockRouter.navigate).toHaveBeenCalledWith([
        '/booking/confirmation',
      ]);
    });

    it('should not navigate if no date is selected', () => {
      mockBookingService.selectedDate.set(null);
      component.onTimeSelected('10:00');

      expect(mockBookingService.setSelectedTime).toHaveBeenCalledWith('10:00');
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  describe('onBackButtonClicked', () => {
    it('should reset selected date', () => {
      component.onBackButtonClicked();
      expect(mockBookingService.setSelectedDate).toHaveBeenCalledWith(null);
    });
  });

  describe('template rendering', () => {
    it('should render time selection only when date is selected', () => {
      // No date selected
      mockBookingService.selectedDate.set(null);
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('app-time-selection')
      ).toBeFalsy();

      // Date selected
      mockBookingService.selectedDate.set('2024-01-15');
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('app-time-selection')
      ).toBeTruthy();
    });
  });
});
