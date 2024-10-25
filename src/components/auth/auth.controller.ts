import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post("login")
    async login(@Body() Body){
        return await this.authService.login(Body);
    }

    @Post("register")
    async register(@Body() Body){
        return await this.authService.register(Body);
    }
}
