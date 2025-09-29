import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormatSelectedDatePipe } from '@app/core/pipes/format-selected-date.pipe';
import { FormatTimezonePipe } from '@app/core/pipes/format-timezone.pipe';

import { FormatTimeRangePipe } from '@core/pipes/format-time-range.pipe';
import {
  MockFormatSelectedDatePipe,
  MockFormatTimezonePipe,
  MockFormatTimeRangePipe,
} from '@core/testing/pipes';

import { BookingSummary } from './booking-summary';

describe('BookingSummary', () => {
  let component: BookingSummary;
  let fixture: ComponentFixture<BookingSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSummary],
    })
      .overrideComponent(BookingSummary, {
        remove: {
          imports: [
            FormatSelectedDatePipe,
            FormatTimezonePipe,
            FormatTimeRangePipe,
          ],
        },
        add: {
          imports: [
            MockFormatSelectedDatePipe,
            MockFormatTimezonePipe,
            MockFormatTimeRangePipe,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BookingSummary);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input properties', () => {
    const selectedDate = '2024-03-15';
    const selectedTime = { start: '09:00', end: '10:00' };
    const sessionData = {
      duration: 60,
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        timeZone: 'America/New_York',
      },
    };

    fixture.componentRef.setInput('selectedDate', selectedDate);
    fixture.componentRef.setInput('selectedTime', selectedTime);
    fixture.componentRef.setInput('sessionData', sessionData);

    expect(component.selectedDate()).toBe(selectedDate);
    expect(component.selectedTime()).toEqual(selectedTime);
    expect(component.sessionData()).toBeTruthy();
    expect(component.sessionData()?.duration).toBe(60);
  });

  it('should handle null input values', () => {
    fixture.componentRef.setInput('selectedDate', null);
    fixture.componentRef.setInput('selectedTime', null);
    fixture.componentRef.setInput('sessionData', null);

    expect(component.selectedDate()).toBeNull();
    expect(component.selectedTime()).toBeNull();
    expect(component.sessionData()).toBeNull();
  });

  it('should render component with valid data', () => {
    const sessionData = {
      duration: 60,
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        timeZone: 'America/New_York',
      },
    };

    fixture.componentRef.setInput('selectedDate', '2024-03-15');
    fixture.componentRef.setInput('selectedTime', {
      start: '09:00',
      end: '10:00',
    });
    fixture.componentRef.setInput('sessionData', sessionData);

    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.booking-summary')
    ).toBeTruthy();
  });
});
