import { Pipe, PipeTransform } from '@angular/core';

import { formatTimeDisplay } from '../utils/date.utils';

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(timeString: string): string {
    if (!timeString) {
      return '';
    }

    return formatTimeDisplay(timeString);
  }
}
