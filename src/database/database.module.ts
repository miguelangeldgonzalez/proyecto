import { ConfigType } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';

// Entities
import { State } from 'src/location/entities/state.entity';
import { Workday } from 'src/workday/entities/workday.entity';
import { Borough } from 'src/location/entities/borough.entity';
import { Municipality } from 'src/location/entities/municipality.entity';
import { WorkdayLocation } from 'src/workday/entities/workday_location.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                return {
                    type: 'postgres',
                    url: configService.postgres.url,
                    entities: [WorkdayLocation, Borough, Municipality, State, Workday],
                    synchronize: false,
                    autoLoadEntities: true,
                    logging: true,
                }
            }
        })
    ]
})
export class DatabaseModule {}
