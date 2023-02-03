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
    async postImage(title: string, description: string, date: string, id: string, imageUrl: string) {
        try {
            const createImage = this.postModel.create({
                title: title,
                description: description,
                date: date,
                owner: id,
                imageUrl: imageUrl,
            })

            return createImage

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: error.message,
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    async findOneImage(id: string) {
        try {
            const findImage = await this.postModel.findById(id);
            if (findImage) {
                const error = new Error('image not found');
            }
            return findImage
        } catch (error) {
            new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: error.message,
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
}
