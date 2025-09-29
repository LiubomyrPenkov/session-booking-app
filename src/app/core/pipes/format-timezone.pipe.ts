import { Pipe, PipeTransform } from '@angular/core';
import { tzName } from '@date-fns/tz';

@Pipe({
  name: 'formatTimezone',
})
export class FormatTimezonePipe implements PipeTransform {
  transform(
    timezone: string | undefined,
    format: 'long' | 'short' = 'short'
  ): string {
    if (!timezone) {
      return 'Unknown';
    }

    return tzName(timezone, new Date(), format);
  }
}
