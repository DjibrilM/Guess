import { Body, Controller, Options } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { authService } from 'src/services/auth/auth.service';
import { UserDto } from 'src/tdo/user.dto';
import { loginDto } from 'src/tdo/user.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Response as ResponseType } from 'express';
import { Res } from '@nestjs/common';


@Controller('auth')
export class authController {
    constructor(private readonly Authservice: authService) { }
    @Post('register')
    async register(@Res({ passthrough: true }) response: ResponseType, @Body() userData: UserDto) {

        const registerService: any = await this.Authservice.registerUser(
            userData.email,
            userData.name,
            userData.password,
            userData.profileImage
        );

        //send authCookie 
        response.cookie(registerService.cookieToken, 'identifier');
        try {
            return {
                email: registerService.email,
                name: registerService.name,
                profileImage: registerService.profileImage,
                authtoken: registerService.authToken,
                id: registerService.id
            }
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
    async login(@Res() response: ResponseType, @Body() loginData: loginDto) {
        const loginService: any = await this.Authservice.loginUser(loginData.email, loginData.password);
        response.cookie(loginService.cookieToken, 'identifier')


        response.status(200).json({
            email: loginService.email,
            name: loginService.name,
            id: loginService.id,
            profileImage: loginService.profileIamge,
            authToken: loginService.authToken,
        })
    }
}
