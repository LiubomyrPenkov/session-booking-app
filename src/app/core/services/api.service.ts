import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { GET_AVAILABLE_DATE_TIMES, GET_SESSION_PAGE } from '../graphql/queries';
import type { SessionPage, DateAvailability } from '../types';
import { adjustDatesToCurrentPeriod } from '../utils/date.utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apollo = inject(Apollo);

  getSessionPage(sessionId: string): Observable<SessionPage> {
    return this.apollo
      .query<{ getSessionPage: SessionPage }>({
        query: GET_SESSION_PAGE,
        variables: { id: sessionId },
      })
      .pipe(
        map(result => result.data.getSessionPage),
        catchError(error => {
          console.error('Error loading session page:', error);
          return of({} as SessionPage);
        })
      );
  }

  getAvailableDateTimes(userId: string): Observable<DateAvailability[]> {
    return this.apollo
      .query<{ getAvailableDateTimes: DateAvailability[] }>({
        query: GET_AVAILABLE_DATE_TIMES,
        variables: { userId },
      })
      .pipe(
        map(result => {
          const availabilityData = result.data.getAvailableDateTimes;
          return adjustDatesToCurrentPeriod(availabilityData);
        }),
        catchError(error => {
          console.error('Error loading availability:', error);
          return of([]);
        })
      );
  }
}
