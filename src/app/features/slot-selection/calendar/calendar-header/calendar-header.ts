import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-calendar-header',
  imports: [MatIcon],
  templateUrl: './calendar-header.html',
  styleUrl: './calendar-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeader {
  private calendar = inject(MatCalendar<Date>);
  private dateAdapter = inject(DateAdapter<Date>);

  get periodButtonText(): string {
    const date = this.calendar.activeDate;
    const monthNames = this.dateAdapter.getMonthNames('long');
    const month = monthNames[this.dateAdapter.getMonth(date)];
    const year = this.dateAdapter.getYear(date);
    return `${month} ${year}`;
  }

  previousClicked(): void {
    this.calendar.activeDate = this.dateAdapter.addCalendarMonths(
      this.calendar.activeDate,
      -1
    );
  }

  nextClicked(): void {
    this.calendar.activeDate = this.dateAdapter.addCalendarMonths(
      this.calendar.activeDate,
      1
    );
  }
}
