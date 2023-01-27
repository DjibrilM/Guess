import { Body, Controller } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { authService } from 'src/services/auth/auth.service';
import { UserDto } from 'src/tdo/user.dto';
import { loginDto } from 'src/tdo/user.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Controller('auth')
export class authController {
    constructor(private readonly Authservice: authService) { }

    @Post('register')
    register(@Body() userData: UserDto): any {
        try {
            return this.Authservice.registerUser(
                userData.email,
                userData.name,
                userData.password,
                userData.profileImage
            );
        } catch (error) {
            console.log(error);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'server error',
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }

    
    @Post('login')
    login(@Body() loginData: loginDto) {

        try {
            return this.Authservice.loginUser(
                loginData.email,
                loginData.password)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'server error',
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }
}
