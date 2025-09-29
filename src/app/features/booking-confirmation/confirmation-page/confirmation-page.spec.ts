import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { BookingService } from '@core/services/booking.service';
import { MockBookingSummary } from '@core/testing/components';
import { createBookingServiceSpy } from '@core/testing/services';

import { ConfirmationPage } from './confirmation-page';
import { BookingSummary } from '../booking-summary';

describe('ConfirmationPage', () => {
  let component: ConfirmationPage;
  let fixture: ComponentFixture<ConfirmationPage>;
  let mockBookingService: jasmine.SpyObj<BookingService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const bookingServiceSpy = createBookingServiceSpy();
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ConfirmationPage],
      providers: [
        { provide: BookingService, useValue: bookingServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    })
      .overrideComponent(ConfirmationPage, {
        remove: { imports: [BookingSummary] },
        add: { imports: [MockBookingSummary] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmationPage);
    component = fixture.componentInstance;
    mockBookingService = TestBed.inject(
      BookingService
    ) as jasmine.SpyObj<BookingService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data from booking service', () => {
    mockBookingService.selectedDate.set('2024-03-15');
    mockBookingService.selectedTime.set({ start: '09:00', end: '10:00' });

    expect(component.selectedDate()).toBe('2024-03-15');
    expect(component.selectedTime()).toEqual({ start: '09:00', end: '10:00' });
  });

  it('should confirm booking and navigate to success page', () => {
    component.onConfirmBooking();

    expect(mockBookingService.confirmBooking).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/booking-success']);
  });

  it('should go back and reset booking', () => {
    component.onGoBack();

    expect(mockBookingService.resetBooking).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/booking/slots']);
  });

  it('should render booking summary component', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });
});
