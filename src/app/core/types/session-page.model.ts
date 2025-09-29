import { SessionHost } from './session-host.model';
import { SessionService } from './session-service.model';
import { SessionUser } from './session-user.model';

export interface SessionPage {
  date: string;
  time: string;
  duration: number;
  host: SessionHost;
  user: SessionUser;
  service: SessionService;
}
