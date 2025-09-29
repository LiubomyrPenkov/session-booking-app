import { TestBed } from '@angular/core/testing';

import { TimeSlotService } from './time-slot.service';
import type { TimeRange } from '../types';

describe('TimeSlotService', () => {
  let service: TimeSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeSlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate time slots', () => {
    const blocks: TimeRange[] = [{ start: '09:00:00', end: '12:00:00' }];
    const result = service.generateBookableTimeSlots(blocks, 60);
    expect(result).toEqual(['09:00', '10:00', '11:00']);
  });

  it('should handle multiple blocks and sort them', () => {
    const blocks: TimeRange[] = [
      { start: '14:00:00', end: '16:00:00' },
      { start: '09:00:00', end: '11:00:00' },
    ];
    const result = service.generateBookableTimeSlots(blocks, 60);
    expect(result).toEqual(['09:00', '10:00', '14:00', '15:00']);
  });

  it('should handle 30-minute sessions', () => {
    const blocks: TimeRange[] = [{ start: '09:00:00', end: '10:30:00' }];
    const result = service.generateBookableTimeSlots(blocks, 30);
    expect(result).toEqual(['09:00', '09:30', '10:00']);
  });

  it('should handle empty blocks', () => {
    const result = service.generateBookableTimeSlots([], 60);
    expect(result).toEqual([]);
  });

  it('should filter out invalid blocks', () => {
    const blocks: TimeRange[] = [
      { start: '09:00:00', end: '11:00:00' },
      { start: 'invalid', end: '13:00:00' },
    ];
    const result = service.generateBookableTimeSlots(blocks, 60);
    expect(result).toEqual(['09:00', '10:00']);
  });

  it('should create time range', () => {
    const result = service.createTimeRange('09:00', 60);
    expect(result).toEqual({ start: '09:00', end: '10:00' });
  });

  it('should handle 30-minute time range', () => {
    const result = service.createTimeRange('14:30', 30);
    expect(result).toEqual({ start: '14:30', end: '15:00' });
  });
});
