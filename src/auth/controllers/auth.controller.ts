import { Req, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Req() req) {
        return req.user;
    }
}
