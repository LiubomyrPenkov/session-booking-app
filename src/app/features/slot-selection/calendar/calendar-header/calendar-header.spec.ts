import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';

import { MockMatIconComponent } from '@core/testing/components/components.mock';

import { CalendarHeader } from './calendar-header';

describe('CalendarHeader', () => {
  let component: CalendarHeader;
  let fixture: ComponentFixture<CalendarHeader>;

  beforeEach(async () => {
    const mockCalendar = {
      activeDate: new Date('2025-09-29'),
    };

    const mockDateAdapter = {
      addCalendarMonths: jasmine
        .createSpy('addCalendarMonths')
        .and.returnValue(new Date()),
      getMonthNames: jasmine
        .createSpy('getMonthNames')
        .and.returnValue([
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]),
      getMonth: jasmine.createSpy('getMonth').and.returnValue(8), // September = 8
      getYear: jasmine.createSpy('getYear').and.returnValue(2025),
    };

    await TestBed.configureTestingModule({
      imports: [CalendarHeader],
      providers: [
        { provide: MatCalendar, useValue: mockCalendar },
        { provide: DateAdapter, useValue: mockDateAdapter },
      ],
    })
      .overrideComponent(CalendarHeader, {
        remove: { imports: [MatIcon] },
        add: { imports: [MockMatIconComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarHeader);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
