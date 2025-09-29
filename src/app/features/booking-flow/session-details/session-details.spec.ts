import { NgTemplateOutlet } from '@angular/common';
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

import { SessionDetails } from './session-details';

describe('SessionDetails', () => {
  let component: SessionDetails;
  let fixture: ComponentFixture<SessionDetails>;
  let sessionDataSpy: any;

  beforeEach(async () => {
    const bookingServiceSpy = createBookingServiceSpy();
    sessionDataSpy = bookingServiceSpy.sessionData;

    await TestBed.configureTestingModule({
      imports: [SessionDetails],
      providers: [{ provide: BookingService, useValue: bookingServiceSpy }],
    })
      .overrideComponent(SessionDetails, {
        remove: { imports: [HostProfile, MatIcon, NgTemplateOutlet] },
        add: {
          imports: [MockHostProfile, MockMatIconComponent, NgTemplateOutlet],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SessionDetails);
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

  it('should render component', () => {
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.session-details')
    ).toBeTruthy();
  });
});
