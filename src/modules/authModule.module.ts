import { Module } from "@nestjs/common";
import { authService } from "src/services/auth/auth.service";
import { authController } from "src/controllers/auth/auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from '../schemas/user.schema';
import { Post, postSchema } from "src/schemas/post.schema";


@Module({
    imports: [MongooseModule.forFeature([
        { name: Post.name, schema: postSchema },
        { name: User.name, schema: UserSchema }])],
    controllers: [authController],
    providers: [authService],
})

export class authModule { }