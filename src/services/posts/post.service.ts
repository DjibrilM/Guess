import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from '../../schemas/post.schema'
import { Model } from "mongoose";
import { postDocument } from "../../schemas/post.schema";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";


@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<postDocument>) { }
    postImage(title: string, description: string, date: string) {
        try {

            console.log('hello world');


            return {
                ur: "",
                title: "",
                description: "",
                date: ""
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