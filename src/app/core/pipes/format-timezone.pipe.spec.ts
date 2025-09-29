import { tzName } from '@date-fns/tz';

import { FormatTimezonePipe } from './format-timezone.pipe';

describe('FormatTimezonePipe', () => {
  let pipe: FormatTimezonePipe;

  beforeEach(() => {
    pipe = new FormatTimezonePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Unknown" for empty input', () => {
    expect(pipe.transform('')).toBe('Unknown');
    expect(pipe.transform(undefined)).toBe('Unknown');
  });

  it('should format timezone in short format by default', () => {
    const timezone = 'America/New_York';
    const expected = tzName(timezone, new Date(), 'short');

    expect(pipe.transform(timezone)).toBe(expected);
  });

  it('should format timezone in long format', () => {
    const timezone = 'America/New_York';
    const expected = tzName(timezone, new Date(), 'long');

    expect(pipe.transform(timezone, 'long')).toBe(expected);
  });
});
