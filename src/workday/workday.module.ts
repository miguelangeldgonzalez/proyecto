import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { WorkdayService } from './services/workday.service';
import { WorkdayLocationService } from './services/workday-location.service';

// Controllers
import { WorkdayController } from './controllers/workday.controller';
import { WorkdayLocationController } from './controllers/workday-location.controller';

// Entities
import { Workday } from './entities/workday.entity';
import { MediaType } from './entities/media_type.entity';
import { WorkdayLocation } from './entities/workday_location.entity';
import { ExternalAssistance } from './entities/external_assistance.entity';

import { LocationModule } from 'src/location/location.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ExternalAssistance, MediaType, WorkdayLocation, Workday]),
    LocationModule
  ],
  controllers: [WorkdayController, WorkdayLocationController],
  providers: [WorkdayService, WorkdayLocationService],
  exports: [WorkdayService, WorkdayLocationService]
})
export class WorkdayModule {}