import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';

import { MockMatIconComponent } from '@testing/components';
import { createBookingServiceSpy } from '@testing/services';

import { AppHeader, HeaderTitle } from './app-header';
import { BookingService } from '../../services/booking.service';

describe('AppHeader', () => {
  let component: AppHeader;
  let fixture: ComponentFixture<AppHeader>;
  let bookingServiceSpy: jasmine.SpyObj<BookingService>;

  beforeEach(async () => {
    bookingServiceSpy = createBookingServiceSpy();

    await TestBed.configureTestingModule({
      imports: [AppHeader, MockMatIconComponent],
      providers: [{ provide: BookingService, useValue: bookingServiceSpy }],
    })
      .overrideComponent(AppHeader, {
        remove: { imports: [MatIcon] },
        add: { imports: [MockMatIconComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppHeader);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "Schedule session" when booking is not completed', () => {
    bookingServiceSpy.bookingCompleted.set(false);
    fixture.detectChanges();

    const titleElement =
      fixture.nativeElement.querySelector('.app-header__title');
    expect(titleElement.textContent.trim()).toBe(HeaderTitle.SCHEDULE_SESSION);
  });

  it('should show "Session scheduled" when booking is completed', () => {
    bookingServiceSpy.bookingCompleted.set(true);
    fixture.detectChanges();

    const titleElement =
      fixture.nativeElement.querySelector('.app-header__title');
    expect(titleElement.textContent.trim()).toBe(HeaderTitle.SESSION_SCHEDULED);
  });
});
