import { Body, Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { authService } from 'src/services/auth/auth.service';
import { UserDto } from 'src/tdo/user.dto';
import { userType } from '../../models/auth.model'

@Controller('auth')
export class authController {
    constructor(private readonly Authservice: authService) { }

    @Get('register')
    register(@Body() userData: UserDto): userType {
        return this.Authservice.registerUser();
    }
}
