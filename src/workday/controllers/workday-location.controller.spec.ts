import { Test, TestingModule } from '@nestjs/testing';
import { WorkdayLocationController } from './workday-location.controller';

describe('WorkdayLocationController', () => {
  let controller: WorkdayLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkdayLocationController],
    }).compile();

    controller = module.get<WorkdayLocationController>(WorkdayLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
