import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Pipe({
  name: 'formatSelectedDate',
})
export class FormatSelectedDatePipe implements PipeTransform {
  transform(dateString: string): string {
    if (!dateString) {
      return '';
    }

    const date = parseISO(dateString);
    return format(date, 'EEEE, d MMMM yyyy');
  }
}
