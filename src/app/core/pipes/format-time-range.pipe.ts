import { Pipe, PipeTransform } from '@angular/core';

import type { TimeRange } from '@core/types';
import { formatTimeDisplay } from '@core/utils/date.utils';

@Pipe({
  name: 'formatTimeRange',
})
export class FormatTimeRangePipe implements PipeTransform {
  transform(timeRange: TimeRange | null): string {
    if (!timeRange) {
      return '';
    }

    const start = formatTimeDisplay(timeRange.start);
    const end = formatTimeDisplay(timeRange.end);
    return `${start} - ${end}`;
  }
}
