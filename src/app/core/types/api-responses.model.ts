import { DateAvailability } from './date-availability.model';
import { SessionPage } from './session-page.model';

export interface GetSessionPageResponse {
  getSessionPage: SessionPage;
}

export interface GetAvailableDateTimesResponse {
  getAvailableDateTimes: DateAvailability[];
}
