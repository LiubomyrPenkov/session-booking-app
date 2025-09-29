import { TimeSlotService } from '../../services/time-slot.service';

export function createTimeSlotServiceSpy() {
  return jasmine.createSpyObj<TimeSlotService>('TimeSlotService', [
    'generateBookableTimeSlots',
    'createTimeRange',
  ]);
}
