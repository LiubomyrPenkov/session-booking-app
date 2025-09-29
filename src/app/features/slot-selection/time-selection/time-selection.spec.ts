import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';

import { FormatSelectedDatePipe } from '@core/pipes/format-selected-date.pipe';
import { FormatTimePipe } from '@core/pipes/format-time.pipe';
import { FormatTimezonePipe } from '@core/pipes/format-timezone.pipe';
import { MockMatIconComponent } from '@core/testing/components/components.mock';
import {
  MockFormatSelectedDatePipe,
  MockFormatTimePipe,
  MockFormatTimezonePipe,
} from '@core/testing/pipes/pipes.mock';
import { SessionPage } from '@core/types';

import { TimeSelection } from './time-selection';

describe('TimeSelection', () => {
  let component: TimeSelection;
  let fixture: ComponentFixture<TimeSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSelection],
    })
      .overrideComponent(TimeSelection, {
        remove: {
          imports: [
            MatIcon,
            FormatSelectedDatePipe,
            FormatTimePipe,
            FormatTimezonePipe,
          ],
        },
        add: {
          imports: [
            MockMatIconComponent,
            MockFormatSelectedDatePipe,
            MockFormatTimePipe,
            MockFormatTimezonePipe,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TimeSelection);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit timeSelected when time is selected', () => {
    spyOn(component.timeSelected, 'emit');

    component.onTimeSelected('10:00');

    expect(component.timeSelected.emit).toHaveBeenCalledWith('10:00');
  });

  it('should emit backButtonClicked when icon is clicked', () => {
    spyOn(component.backButtonClicked, 'emit');

    component.onIconClick();

    expect(component.backButtonClicked.emit).toHaveBeenCalled();
  });

  it('should format current time in user timezone', () => {
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

    fixture.componentRef.setInput('sessionData', mockSessionData);

    const currentTimeValue = component.currentTime();
    expect(typeof currentTimeValue).toBe('string');
    expect(currentTimeValue).toMatch(/^\d{2}:\d{2}$/); // Should match HH:MM format
  });

  it('should render time slots and handle clicks', () => {
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

    fixture.componentRef.setInput('selectedDate', '2024-01-15');
    fixture.componentRef.setInput('sessionData', mockSessionData);
    fixture.componentRef.setInput('availableTimeSlots', ['09:00', '10:00']);

    spyOn(component, 'onTimeSelected');
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.time-selection__slot'
    );
    expect(buttons.length).toBe(2);

    buttons[0].click();
    expect(component.onTimeSelected).toHaveBeenCalledWith('09:00');
  });
});
