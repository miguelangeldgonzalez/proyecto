import { TestBed } from '@angular/core/testing';

import { WorkdayLocationService } from './workday-location.service';

describe('WorkdayLocationService', () => {
  let service: WorkdayLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkdayLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
