import { Component, Input, input, output } from '@angular/core';

@Component({
  selector: 'app-header',
  template: '<header class="app-header"><h1>Schedule session</h1></header>',
})
export class MockAppHeader {}

@Component({
  selector: 'mat-icon',
  template: '<span data-testid="mock-icon">{{ svgIcon || fontIcon }}</span>',
  standalone: true,
})
export class MockMatIconComponent {
  @Input() svgIcon?: string;
  @Input() fontIcon?: string;
  @Input() class?: string;
  @Input() color?: string;
}

@Component({
  selector: 'app-loading-spinner',
  template: '<div class="mock-loading-spinner" [attr.data-size]="size"></div>',
})
export class MockLoadingSpinner {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}

@Component({
  selector: 'app-booking-summary',
  template: '<div class="mock-booking-summary">Mock Booking Summary</div>',
})
export class MockBookingSummary {
  selectedDate = input<string | null>();
  selectedTime = input<any>();
  sessionData = input<any>();
}

@Component({
  selector: 'app-session-details',
  template: '<div class="mock-session-details">Mock Session Details</div>',
})
export class MockSessionDetails {}

@Component({
  selector: 'app-host-profile',
  template: '<div class="mock-host-profile">Mock Host Profile</div>',
})
export class MockHostProfile {
  host = input<any>();
}

@Component({
  selector: 'app-calendar',
  template: '<div class="mock-calendar">Mock Calendar</div>',
})
export class MockCalendar {
  availabilityData = input<any>();
  selectedDate = input<string | null>();
  sessionData = input<any>();
  dateSelected = output<Date>();
}

@Component({
  selector: 'app-time-selection',
  template: '<div class="mock-time-selection">Mock Time Selection</div>',
})
export class MockTimeSelection {
  selectedDate = input<string | null>();
  selectedTime = input<any>();
  availableTimeSlots = input<string[]>();
  sessionData = input<any>();
  timeSelected = output<string>();
  backButtonClicked = output<void>();
}
