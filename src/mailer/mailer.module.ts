import { Module } from '@nestjs/common';
import { MailerService } from './services/mailer.service';

import config from '../config';
import { ConfigType } from '@nestjs/config';

@Module({
  providers: [
    MailerService,
    {
      provide: 'MAIL_CONFIG',
      useFactory: (configService: ConfigType<typeof config>) => {
        return configService.mailer;
      },
      inject: [config.KEY]
    }
  ],
  exports: [MailerService]
})
export class MailerModule {}
