import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './../config';

import { User } from 'src/user/entities/user.entity';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        secret: configService.jwtSecret,
        signOptions: {
          expiresIn: '1h'
        }
      })
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
