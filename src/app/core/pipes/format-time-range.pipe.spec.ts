import { FormatTimeRangePipe } from './format-time-range.pipe';
import type { TimeRange } from '../types';
import { formatTimeDisplay } from '../utils/date.utils';

describe('FormatTimeRangePipe', () => {
  let pipe: FormatTimeRangePipe;

  beforeEach(() => {
    pipe = new FormatTimeRangePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null input', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('should format time range using utils', () => {
    const timeRange: TimeRange = { start: '09:00', end: '10:00' };
    const expected = `${formatTimeDisplay('09:00')} - ${formatTimeDisplay('10:00')}`;

    expect(pipe.transform(timeRange)).toBe(expected);
  });
});
