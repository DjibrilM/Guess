import { Controller, Get, Post, Patch, Body, Request, Param } from "@nestjs/common";
import { PostService } from "src/services/posts/post.service";
import { PostDto } from "src/tdo/post.dto";
import { Request as requestType } from "express";
import { Post as post, postDocument } from "src/schemas/post.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UseInterceptors } from "@nestjs/common";
import { UploadedFile } from "@nestjs/common";
import { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadImage } from "src/lib/cloudinary";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";

interface postImage {
    url: string,
    title: string,
    description: string,
    date: string,
}



@Controller('image')
export class PostController {
    constructor(private readonly postService: PostService, @InjectModel(post.name) private postModel: Model<postDocument>) { }
    @Post('create')
    @UseInterceptors(FileInterceptor('file', {
        dest: './upload',
    }))
    async postImage(@UploadedFile() file: Express.Multer.File, @Body() requestBody: PostDto, @Request() request: requestType | any) {
        try {
            const uploadFiles: any = await uploadImage(file.path);
            return this.postService.postImage(requestBody.title, requestBody.description, requestBody.date, request.user.id, uploadFiles.url);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: error.message,
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    @Get('findOne/:id')
    getOneImage(@Param() param) {
        return this.postService.findOneImage(param.id);
    }
}
