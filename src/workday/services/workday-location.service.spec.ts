import { Test, TestingModule } from '@nestjs/testing';
import { WorkdayLocationService } from './workday-location.service';

describe('WorkdayLocationService', () => {
  let service: WorkdayLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkdayLocationService],
    }).compile();

    service = module.get<WorkdayLocationService>(WorkdayLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
