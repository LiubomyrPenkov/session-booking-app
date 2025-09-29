import { FormatTimePipe } from './format-time.pipe';
import { formatTimeDisplay } from '../utils/date.utils';

describe('FormatTimePipe', () => {
  let pipe: FormatTimePipe;

  beforeEach(() => {
    pipe = new FormatTimePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as any)).toBe('');
  });

  it('should format time using utils', () => {
    const result = pipe.transform('14:30');
    expect(result).toBe(formatTimeDisplay('14:30'));
  });
});
