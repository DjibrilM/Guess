import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import mongoose from "mongoose";

export type postDocument = HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    imageUrl: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    owner: string

    @Prop({ required: true })
    date: string
}
export const postSchema = SchemaFactory.createForClass(Post);