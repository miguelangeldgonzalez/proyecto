import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Entities
import { User } from './entities/user.entity';
import { Role } from '../auth/entities/role.entity';

// Modules
import { AuthModule } from 'src/auth/auth.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { LocationModule } from 'src/location/location.module';

// Services
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';

import { UserController } from './controllers/user.controller';

@Module({
  providers: [UserService, RoleService],
  imports: [
    TypeOrmModule.forFeature([User, Role]), 
    LocationModule,
    AuthModule,
    MailerModule
  ],
  controllers: [UserController]
})
export class UserModule {}
