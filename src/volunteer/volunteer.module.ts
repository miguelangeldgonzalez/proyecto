import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { WorkdayModule } from 'src/workday/workday.module';
import { LocationModule } from 'src/location/location.module';

import { Volunteer } from './entities/volunteer.entity';
import { VolunteerService } from './services/volunteer.service';
import { VolunteerController } from './controllers/volunteer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Volunteer]), LocationModule, WorkdayModule],
  providers: [VolunteerService],
  controllers: [VolunteerController]
})
export class VolunteerModule {}
