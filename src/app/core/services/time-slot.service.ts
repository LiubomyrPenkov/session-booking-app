import { Injectable } from '@angular/core';
import { addMinutes, format, isValid, parse, startOfDay } from 'date-fns';

import type { TimeRange } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TimeSlotService {
  generateBookableTimeSlots(
    availableBlocks: TimeRange[],
    sessionDurationMinutes: number
  ): string[] {
    return availableBlocks
      .flatMap(block =>
        this.generateSlotsFromBlock(
          block.start,
          block.end,
          sessionDurationMinutes
        )
      )
      .sort();
  }

  private generateSlotsFromBlock(
    startTime: string,
    endTime: string,
    durationMinutes: number
  ): string[] {
    const baseDate = startOfDay(new Date());

    const startDate = parse(startTime, 'HH:mm:ss', baseDate);
    const endDate = parse(endTime, 'HH:mm:ss', baseDate);

    // Validate parsed dates
    if (!isValid(startDate) || !isValid(endDate)) {
      console.warn(`Invalid time format: start=${startTime}, end=${endTime}`);
      return [];
    }

    if (startDate >= endDate) {
      console.warn(`Invalid time range: start=${startTime} >= end=${endTime}`);
      return [];
    }

    // Generate time slots with safety limit
    const slots: string[] = [];
    let currentTime = startDate;
    let iterations = 0;
    const MAX_SLOTS = 100; // Safety limit to prevent infinite loops

    while (
      addMinutes(currentTime, durationMinutes) <= endDate &&
      iterations < MAX_SLOTS
    ) {
      slots.push(format(currentTime, 'HH:mm'));
      currentTime = addMinutes(currentTime, durationMinutes);
      iterations++;
    }

    if (iterations >= MAX_SLOTS) {
      console.warn(
        `Maximum slot limit (${MAX_SLOTS}) reached for time range ${startTime} - ${endTime}`
      );
    }

    return slots;
  }

  createTimeRange(timeString: string, durationMinutes: number): TimeRange {
    const baseDate = startOfDay(new Date());
    const startTime = parse(timeString, 'HH:mm', baseDate);

    const endTime = addMinutes(startTime, durationMinutes);

    return {
      start: format(startTime, 'HH:mm'),
      end: format(endTime, 'HH:mm'),
    };
  }
}
