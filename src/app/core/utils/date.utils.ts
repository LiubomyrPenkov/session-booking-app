import {
  addMonths,
  differenceInMonths,
  format,
  isBefore,
  parse,
  parseISO,
  startOfDay,
} from 'date-fns';

import type { DateAvailability } from '../types';

export function adjustDatesToCurrentPeriod(
  data: DateAvailability[]
): DateAvailability[] {
  if (!data.length) {
    return data;
  }

  const firstApiDate = parseISO(data[0].date);
  const now = new Date();
  const monthDiff = differenceInMonths(now, firstApiDate);

  return data.map(item => {
    const date = parseISO(item.date);
    const adjustedDate = addMonths(date, monthDiff);
    return {
      ...item,
      date: formatDateString(adjustedDate),
    };
  });
}

export function formatDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatTimeDisplay(timeString: string): string {
  const baseDate = startOfDay(new Date());
  const date = parse(timeString, 'HH:mm', baseDate);
  return format(date, 'h:mmaaa');
}

export function isPastDate(dateString: string): boolean {
  const date = parseISO(dateString);
  const today = startOfDay(new Date());
  return isBefore(date, today);
}
