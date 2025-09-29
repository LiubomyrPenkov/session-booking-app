import { ApiService } from '../../services/api.service';

export function createApiServiceSpy() {
  return jasmine.createSpyObj<ApiService>('ApiService', [
    'getSessionPage',
    'getAvailableDateTimes',
  ]);
}
