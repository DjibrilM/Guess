import { Controller, Get, Post, Patch, Body, Request } from "@nestjs/common";
import { PostService } from "src/services/posts/post.service";
import { PostDto } from "src/tdo/post.dto";
import { Request as requestType } from "express";
import { Post as post, postDocument } from "src/schemas/post.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

interface postImage {
    url: string,
    title: string,
    description: string,
    date: string,
}

@Controller('image')
export class PostController {
    constructor(private readonly postService: PostService , @InjectModel(post.name) private postModel: Model<postDocument>) { }

    @Post('create')
    async postImage(@Body() requestBody: PostDto, @Request() request: requestType) {
        
        const posts = await this.postModel.find();
        console.log(posts);

        console.log(request.user, 'request user');
        return this.postService.postImage(requestBody.title, requestBody.description, requestBody.date);
    }
}