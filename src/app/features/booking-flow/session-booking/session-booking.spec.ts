import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';

import { LoadingSpinner } from '@core/components/loading-spinner';
import { BookingService } from '@core/services/booking.service';
import {
  MockSessionDetails,
  MockLoadingSpinner,
} from '@core/testing/components/components.mock';
import { createBookingServiceSpy } from '@core/testing/services';

import { SessionBooking } from './session-booking';
import { SessionDetails } from '../session-details';

describe('SessionBooking', () => {
  let component: SessionBooking;
  let fixture: ComponentFixture<SessionBooking>;
  let mockBookingService: jasmine.SpyObj<BookingService>;

  beforeEach(async () => {
    const bookingServiceSpy = createBookingServiceSpy();

    await TestBed.configureTestingModule({
      imports: [SessionBooking, RouterOutlet],
      providers: [{ provide: BookingService, useValue: bookingServiceSpy }],
    })
      .overrideComponent(SessionBooking, {
        remove: { imports: [SessionDetails, LoadingSpinner] },
        add: { imports: [MockSessionDetails, MockLoadingSpinner] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SessionBooking);
    component = fixture.componentInstance;
    mockBookingService = TestBed.inject(
      BookingService
    ) as jasmine.SpyObj<BookingService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when session data is loaded', () => {
    beforeEach(() => {
      (mockBookingService.sessionData as any).set({
        id: '123',
        host: { name: 'Test Host' },
        title: 'Test Session',
      });
    });

    it('should display main content', () => {
      fixture.detectChanges();

      const mainContent =
        fixture.nativeElement.querySelector('.session-booking');
      const loading = fixture.nativeElement.querySelector(
        '.session-booking__loading'
      );

      expect(mainContent).toBeTruthy();
      expect(loading).toBeFalsy();
    });

    it('should apply date-selected class when date is selected', () => {
      (mockBookingService.selectedDate as any).set('2024-03-15');
      fixture.detectChanges();

      const sessionBookingElement =
        fixture.nativeElement.querySelector('.session-booking');
      expect(sessionBookingElement.classList).toContain(
        'session-booking--date-selected'
      );
    });
  });

  describe('when session data is loading', () => {
    beforeEach(() => {
      (mockBookingService.sessionData as any).set(null);
    });

    it('should display loading spinner', () => {
      fixture.detectChanges();

      const loading = fixture.nativeElement.querySelector(
        '.session-booking__loading'
      );
      const spinner = fixture.nativeElement.querySelector(
        'app-loading-spinner'
      );

      expect(loading).toBeTruthy();
      expect(spinner).toBeTruthy();
    });

    it('should not display main content', () => {
      fixture.detectChanges();

      const sessionDetails = fixture.nativeElement.querySelector(
        'app-session-details'
      );
      const routerOutlet = fixture.nativeElement.querySelector('router-outlet');

      expect(sessionDetails).toBeFalsy();
      expect(routerOutlet).toBeFalsy();
    });
  });
});
