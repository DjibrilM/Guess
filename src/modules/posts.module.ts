import { Module, RequestMethod } from "@nestjs/common";
import { PostController } from "src/controllers/post/post.controller";
import { PostService } from "src/services/posts/post.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, postSchema } from "src/schemas/post.schema";
import { MiddlewareConsumer } from "@nestjs/common";
import { NestModule } from "@nestjs/common";
import { authenticaionMiddleware } from "src/middleware/auth.middleware";
import { User, UserSchema } from "src/schemas/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Post.name, schema: postSchema },
            { name: User.name, schema: UserSchema }
        ])],
    controllers: [PostController],
    providers: [PostService]
})
export class postModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(authenticaionMiddleware).forRoutes({ path: "image/create", method: RequestMethod.ALL })
    }
}