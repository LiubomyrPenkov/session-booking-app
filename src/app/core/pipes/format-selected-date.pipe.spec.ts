import { FormatSelectedDatePipe } from './format-selected-date.pipe';

describe('FormatSelectedDatePipe', () => {
  let pipe: FormatSelectedDatePipe;

  beforeEach(() => {
    pipe = new FormatSelectedDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should format valid date string', () => {
    const result = pipe.transform('2025-09-29');

    expect(result).toBe('Monday, 29 September 2025');
  });
});
