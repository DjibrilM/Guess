import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, userDocument } from '../../schemas/user.schema'
import { Model } from "mongoose";
import { hashPassword } from "src/lib/bcrypt";
import { compare } from "src/lib/bcrypt";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { signLocalToken, signCookieToken } from "src/lib/jwt";


@Injectable()
export class authService {
    constructor(@InjectModel(User.name) private userModel: Model<userDocument>) { }
    //register service 
    async registerUser(email: string, name: string, password: string, profileImage: string) {
        try {
            const hashedPassword: string = await hashPassword(password)
            //find existing user with the same email address
            const findExistingUser = await this.userModel.findOne({
                email: email
            })

            if (findExistingUser) {
                const error: Error = new Error('user with this email already exist')
                throw error;
            }

            const newUser = new this.userModel({
                email: email,
                name: name,
                password: hashedPassword,
                profileImage: profileImage
            })

            const savedUser = await newUser.save()
            const cookieToken = signCookieToken(savedUser.email, savedUser.id);
            const authToken = signLocalToken(savedUser.email, savedUser.id);
            return {
                email: savedUser.email,
                name: savedUser.name,
                id: savedUser.id,
                profileImage: savedUser.profileImage,
                authToken: authToken,
                cookieToken: cookieToken,
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: error.message,
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }

    }


    //login service 
    async loginUser(email: string, password: string) {
        try {
            const findUser = await this.userModel.findOne({
                email: email
            })

            if (!findUser) {
                const error = new Error('user not found !');
                throw error;
            }

            const comparePassword: boolean = await compare(password, findUser.password)
            if (comparePassword === false) {
                const error: Error = new Error('invalid password')
                throw error;
            }

            const cookieToken = signCookieToken(findUser.email, findUser.id);
            const authToken = signLocalToken(findUser.email, findUser.id);
            return {
                email: findUser.email,
                name: findUser.name,
                id: findUser.id,
                profileIamge: findUser.profileImage,
                authToken: authToken,
                cookieToken: cookieToken,
            }

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: error.message,
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
}