import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { bookingConfirmationGuard } from './booking-confirmation.guard';
import { BookingService } from '../services/booking.service';
import { createBookingServiceSpy } from '../testing/services/booking-service.spy.spec';

describe('bookingConfirmationGuard', () => {
  let mockBookingService: jasmine.SpyObj<BookingService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const bookingServiceSpy = createBookingServiceSpy();
    const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: BookingService, useValue: bookingServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    mockBookingService = TestBed.inject(
      BookingService
    ) as jasmine.SpyObj<BookingService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access when both selectedDate and selectedTime are set', () => {
    mockBookingService.selectedDate.set('2024-03-15');
    mockBookingService.selectedTime.set({ start: '09:00', end: '10:00' });

    const result = TestBed.runInInjectionContext(() =>
      bookingConfirmationGuard(null as any, null as any)
    );

    expect(result).toBe(true);
  });

  it('should redirect when selectedDate is null', () => {
    mockBookingService.selectedDate.set(null);
    mockBookingService.selectedTime.set({ start: '09:00', end: '10:00' });
    const mockUrlTree = {} as any;
    mockRouter.parseUrl.and.returnValue(mockUrlTree);

    const result = TestBed.runInInjectionContext(() =>
      bookingConfirmationGuard(null as any, null as any)
    );

    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/booking/slots');
    expect(result).toBe(mockUrlTree);
  });

  it('should redirect when selectedTime is null', () => {
    mockBookingService.selectedDate.set('2024-03-15');
    mockBookingService.selectedTime.set(null);
    const mockUrlTree = {} as any;
    mockRouter.parseUrl.and.returnValue(mockUrlTree);

    const result = TestBed.runInInjectionContext(() =>
      bookingConfirmationGuard(null as any, null as any)
    );

    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/booking/slots');
    expect(result).toBe(mockUrlTree);
  });

  it('should redirect when both selectedDate and selectedTime are null', () => {
    mockBookingService.selectedDate.set(null);
    mockBookingService.selectedTime.set(null);
    const mockUrlTree = {} as any;
    mockRouter.parseUrl.and.returnValue(mockUrlTree);

    const result = TestBed.runInInjectionContext(() =>
      bookingConfirmationGuard(null as any, null as any)
    );

    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/booking/slots');
    expect(result).toBe(mockUrlTree);
  });
});
