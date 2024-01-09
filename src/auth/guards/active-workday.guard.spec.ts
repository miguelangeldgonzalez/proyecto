import { ActiveWorkdayGuard } from './active-workday.guard';

describe('ActiveWorkdayGuard', () => {
  it('should be defined', () => {
    expect(new ActiveWorkdayGuard()).toBeDefined();
  });
});
