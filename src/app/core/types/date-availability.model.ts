import { TimeRange } from './time-range.model';

export interface DateAvailability {
  date: string;
  times: TimeRange[];
}
