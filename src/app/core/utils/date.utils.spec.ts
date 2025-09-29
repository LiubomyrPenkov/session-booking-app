import {
  adjustDatesToCurrentPeriod,
  formatDateString,
  formatTimeDisplay,
  isPastDate,
} from './date.utils';
import type { DateAvailability } from '../types';

describe('Date Utils', () => {
  describe('formatDateString', () => {
    it('should format date as YYYY-MM-DD', () => {
      const date = new Date('2025-09-29T10:00:00Z');
      expect(formatDateString(date)).toBe('2025-09-29');
    });
  });

  describe('formatTimeDisplay', () => {
    it('should format time as 12-hour format', () => {
      expect(formatTimeDisplay('14:30')).toBe('2:30pm');
      expect(formatTimeDisplay('09:00')).toBe('9:00am');
      expect(formatTimeDisplay('00:00')).toBe('12:00am');
    });
  });

  describe('isPastDate', () => {
    it('should return true for past dates', () => {
      expect(isPastDate('2020-01-01')).toBe(true);
    });

    it('should return false for future dates', () => {
      expect(isPastDate('2030-01-01')).toBe(false);
    });
  });

  describe('adjustDatesToCurrentPeriod', () => {
    it('should return empty array for empty input', () => {
      expect(adjustDatesToCurrentPeriod([])).toEqual([]);
    });

    it('should adjust dates to current period', () => {
      const mockData: DateAvailability[] = [
        { date: '2020-01-01', times: [{ start: '09:00:00', end: '17:00:00' }] },
        { date: '2020-01-02', times: [{ start: '09:00:00', end: '17:00:00' }] },
      ];

      const result = adjustDatesToCurrentPeriod(mockData);

      expect(result.length).toBe(2);
      expect(result[0].date).toMatch(/\d{4}-\d{2}-\d{2}/);
      expect(result[1].date).toMatch(/\d{4}-\d{2}-\d{2}/);
    });
  });
});
