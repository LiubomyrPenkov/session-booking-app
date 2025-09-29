import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';

import { HostProfile } from '@core/components/host-profile';
import { BookingService } from '@core/services/booking.service';
import {
  MockHostProfile,
  MockMatIconComponent,
} from '@core/testing/components/components.mock';
import { createBookingServiceSpy } from '@core/testing/services';
import { SessionPage } from '@core/types';

import { BookingCompleted } from './booking-completed';

describe('BookingCompleted', () => {
  let component: BookingCompleted;
  let fixture: ComponentFixture<BookingCompleted>;
  let sessionDataSpy: any;

  beforeEach(async () => {
    const bookingServiceSpy = createBookingServiceSpy();
    // Store reference to the sessionData signal for testing
    sessionDataSpy = bookingServiceSpy.sessionData;

    await TestBed.configureTestingModule({
      imports: [BookingCompleted],
      providers: [{ provide: BookingService, useValue: bookingServiceSpy }],
    })
      .overrideComponent(BookingCompleted, {
        remove: { imports: [HostProfile, MatIcon] },
        add: { imports: [MockHostProfile, MockMatIconComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BookingCompleted);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get sessionData from booking service', () => {
    const mockSessionData: SessionPage = {
      date: '2024-01-15',
      time: '10:00',
      duration: 60,
      host: {
        photo: 'photo.jpg',
        firstName: 'John',
        lastName: 'Doe',
        profession: 'Consultant',
      },
      user: {
        email: 'user@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        timeZone: 'America/New_York',
      },
      service: { title: 'Consultation' },
    };
    sessionDataSpy.set(mockSessionData);

    expect(component.sessionData()).toEqual(mockSessionData);
  });

  it('should handle null sessionData', () => {
    sessionDataSpy.set(null);

    expect(component.sessionData()).toBeNull();
  });

  it('should render completion content', () => {
    fixture.detectChanges();

    const completionElement =
      fixture.nativeElement.querySelector('.completion');
    expect(completionElement).toBeTruthy();

    const titleElement =
      fixture.nativeElement.querySelector('.completion__title');
    expect(titleElement?.textContent).toContain('Booking Successful');
  });

  it('should render host profile with session data', () => {
    const mockSessionData: SessionPage = {
      date: '2024-01-15',
      time: '10:00',
      duration: 60,
      host: {
        photo: 'photo.jpg',
        firstName: 'John',
        lastName: 'Doe',
        profession: 'Consultant',
      },
      user: {
        email: 'user@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        timeZone: 'America/New_York',
      },
      service: { title: 'Consultation' },
    };
    sessionDataSpy.set(mockSessionData);
    fixture.detectChanges();

    const hostProfileElement =
      fixture.nativeElement.querySelector('app-host-profile');
    expect(hostProfileElement).toBeTruthy();
  });

  it('should render CTA section with external link', () => {
    fixture.detectChanges();

    const ctaElement = fixture.nativeElement.querySelector('.completion__cta');
    expect(ctaElement).toBeTruthy();

    const ctaText = fixture.nativeElement.querySelector(
      '.completion__cta-text'
    );
    expect(ctaText?.textContent).toContain(
      'Take your growth to the next level'
    );

    const ctaButton = fixture.nativeElement.querySelector(
      '.completion__cta-button'
    );
    expect(ctaButton).toBeTruthy();
    expect(ctaButton.href).toBe('https://vibly.io/');
    expect(ctaButton.target).toBe('_blank');
    expect(ctaButton.rel).toBe('noopener noreferrer');
    expect(ctaButton.textContent).toContain('Join Vibly');
  });

  it('should render check circle icon', () => {
    fixture.detectChanges();

    const iconElement = fixture.nativeElement.querySelector(
      'mat-icon[svgIcon="check_circle"]'
    );
    expect(iconElement).toBeTruthy();
  });
});
