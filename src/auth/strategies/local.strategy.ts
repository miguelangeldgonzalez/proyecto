import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        usernameField: 'email'
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const accessToken = await this.authService.login(username, password);
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    return accessToken;
  }
}