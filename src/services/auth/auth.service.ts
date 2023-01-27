import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, userDocument } from '../../schemas/user.schema'
import { Model } from "mongoose";
import { hashPassword } from "src/lib/bcrypt";
import { compare } from "src/lib/bcrypt";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";


@Injectable()
export class authService {
    constructor(@InjectModel(User.name) private userModel: Model<userDocument>) { }

    async registerUser(email: string, name: string, password: string, profileImage: string) {
        const hashedPassword: string = await hashPassword(password)

        const newUser = new this.userModel({
            email: email,
            name: name,
            password: hashedPassword,
            profileImage: profileImage
        })
        const savedUser = await newUser.save()
        return {
            email: savedUser.email,
            name: savedUser.name,
            id: savedUser.id,
            profileImage: savedUser.profileImage,
        }
    }

    async loginUser(email: string, password: string) {
        //find if user exist 
        const findUser = await this.userModel.findOne({
            email: email
        })

        if (!findUser) {
            const error = new Error('user not found !');

            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'user not found !',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
        const comparePassword: boolean = await compare(password, findUser.password)
        if (comparePassword === false) {
            const error = new Error('invalid password')

            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }

        return {
            email: findUser.email,
            name: findUser.name,
            id: findUser.id,
            profileIamge: findUser.profileImage,
        }
    }
}