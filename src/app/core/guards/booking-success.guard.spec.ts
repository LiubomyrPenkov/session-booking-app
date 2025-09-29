import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { bookingSuccessGuard } from './booking-success.guard';
import { BookingService } from '../services/booking.service';
import { createBookingServiceSpy } from '../testing/services/booking-service.spy.spec';

describe('bookingSuccessGuard', () => {
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

  it('should allow access when booking is completed', () => {
    mockBookingService.bookingCompleted.set(true);

    const result = TestBed.runInInjectionContext(() =>
      bookingSuccessGuard(null as any, null as any)
    );

    expect(result).toBe(true);
  });

  it('should redirect when booking is not completed', () => {
    mockBookingService.bookingCompleted.set(false);
    const mockUrlTree = {} as any;
    mockRouter.parseUrl.and.returnValue(mockUrlTree);

    const result = TestBed.runInInjectionContext(() =>
      bookingSuccessGuard(null as any, null as any)
    );

    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/booking/slots');
    expect(result).toBe(mockUrlTree);
  });

  it('should redirect when bookingCompleted is initially false', () => {
    const mockUrlTree = {} as any;
    mockRouter.parseUrl.and.returnValue(mockUrlTree);

    const result = TestBed.runInInjectionContext(() =>
      bookingSuccessGuard(null as any, null as any)
    );

    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/booking/slots');
    expect(result).toBe(mockUrlTree);
  });
});
