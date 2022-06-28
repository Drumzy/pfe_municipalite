import { Body, Controller, Post } from '@nestjs/common';
import { PayloadInterface } from '../../utils/interfaces/payload.infterface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('/login')
    Login(@Body() login_credentials: PayloadInterface){
        return this.authService.login(login_credentials);
    }
}
