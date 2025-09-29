import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { of, throwError } from 'rxjs';

import { ApiService } from './api.service';
import { GET_AVAILABLE_DATE_TIMES, GET_SESSION_PAGE } from '../graphql/queries';
import type { SessionPage } from '../types';

describe('ApiService', () => {
  let service: ApiService;
  let mockApollo: jasmine.SpyObj<Apollo>;

  beforeEach(() => {
    const apolloSpy = jasmine.createSpyObj('Apollo', ['query']);

    TestBed.configureTestingModule({
      providers: [ApiService, { provide: Apollo, useValue: apolloSpy }],
    });

    service = TestBed.inject(ApiService);
    mockApollo = TestBed.inject(Apollo) as jasmine.SpyObj<Apollo>;
  });

  describe('getSessionPage', () => {
    it('should return session page data', () => {
      const mockSessionData = {
        date: '2024-03-15',
        time: '09:00',
        duration: 60,
      };
      const apolloResult = {
        data: { getSessionPage: mockSessionData },
        loading: false,
        networkStatus: 7,
      };
      mockApollo.query.and.returnValue(of(apolloResult));

      service.getSessionPage('session-123').subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.duration).toBe(60);
      });

      expect(mockApollo.query).toHaveBeenCalledWith({
        query: GET_SESSION_PAGE,
        variables: { id: 'session-123' },
      });
    });

    it('should handle error and return empty object', () => {
      mockApollo.query.and.returnValue(throwError(() => 'Network error'));

      service.getSessionPage('session-123').subscribe(result => {
        expect(result).toEqual({} as SessionPage);
      });
    });
  });

  describe('getAvailableDateTimes', () => {
    it('should return availability data', () => {
      const mockAvailabilityData = [
        { date: '2024-03-15', times: [] as string[] },
      ];
      const apolloResult = {
        data: { getAvailableDateTimes: mockAvailabilityData },
        loading: false,
        networkStatus: 7,
      };
      mockApollo.query.and.returnValue(of(apolloResult));

      service.getAvailableDateTimes('user-123').subscribe(result => {
        expect(result).toBeTruthy();
        expect(Array.isArray(result)).toBe(true);
      });

      expect(mockApollo.query).toHaveBeenCalledWith({
        query: GET_AVAILABLE_DATE_TIMES,
        variables: { userId: 'user-123' },
      });
    });

    it('should handle error and return empty array', () => {
      mockApollo.query.and.returnValue(throwError(() => 'Network error'));

      service.getAvailableDateTimes('user-123').subscribe(result => {
        expect(result).toEqual([]);
      });
    });
  });
});
