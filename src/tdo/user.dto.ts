import {
    IsEmail,
    IsNotEmpty,
    MinLength,
} from "class-validator";



export class UserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @MinLength(4)
    password: string;

    
    @IsNotEmpty()
    profileImage: string
}


export class loginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

}