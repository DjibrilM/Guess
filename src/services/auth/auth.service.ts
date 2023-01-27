import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, userDocument } from '../../schemas/user.schema'
import { Model } from "mongoose";
import { userType } from '../../models/auth.model'


@Injectable()
export class authService {
    constructor(@InjectModel(User.name) private userModel: Model<userDocument>) { }
    registerUser(): userType {
        return {
            name: '',
            email: '',
            id: "",
            profileImage: '',

        }
    }
}