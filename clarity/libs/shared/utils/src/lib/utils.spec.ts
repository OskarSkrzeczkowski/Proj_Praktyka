import { formatMs } from './utils.js';

describe('utils', () => {
  it('should format milliseconds correctly', () => {
    expect(formatMs(500)).toEqual('500 ms');
  });
});