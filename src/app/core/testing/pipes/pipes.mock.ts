import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSelectedDate',
  standalone: true,
})
export class MockFormatSelectedDatePipe implements PipeTransform {
  transform(value: string | null): string {
    return value ? `Formatted Date: ${value}` : '';
  }
}

@Pipe({
  name: 'formatTime',
  standalone: true,
})
export class MockFormatTimePipe implements PipeTransform {
  transform(value: string): string {
    return value ? `Formatted Time: ${value}` : '';
  }
}

@Pipe({
  name: 'formatTimezone',
  standalone: true,
})
export class MockFormatTimezonePipe implements PipeTransform {
  transform(value: string, _format?: string): string {
    return value ? `Formatted Timezone: ${value}` : 'Unknown';
  }
}

@Pipe({
  name: 'formatTimeRange',
  standalone: true,
})
export class MockFormatTimeRangePipe implements PipeTransform {
  transform(value: any): string {
    return value ? `Formatted Time Range: ${value.start} - ${value.end}` : '';
  }
}
