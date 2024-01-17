import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { State } from './entities/state.entity';
import { Borough } from './entities/borough.entity';
import { Municipality } from './entities/municipality.entity';

// Services
import { ZoneService } from './services/zone.service';

import { ZoneController } from './controllers/zone.controller';


@Module({
  imports: [TypeOrmModule.forFeature([State, Municipality, Borough])],
  providers: [ZoneService],
  exports: [ZoneService],
  controllers: [ZoneController]
})
export class LocationModule {}
