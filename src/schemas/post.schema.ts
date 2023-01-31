import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import mongoose from "mongoose";

export type postDocument = HydratedDocument<Post>;

export class Post {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    title: string;

    @Prop()
    imageUrl: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: string

    @Prop()
    date: string
}
export const postSchema = SchemaFactory.createForClass(Post);