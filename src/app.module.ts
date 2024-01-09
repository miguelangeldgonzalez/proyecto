import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

// Modules
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { WorkdayModule } from './workday/workday.module';
import { LocationModule } from './location/location.module';
import { DatabaseModule } from './database/database.module';
import { VolunteerModule } from './volunteer/volunteer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true
    }),
    LocationModule, DatabaseModule, 
    WorkdayModule, VolunteerModule, 
    UserModule, AuthModule, MailerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
