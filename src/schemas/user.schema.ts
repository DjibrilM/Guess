import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type userDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ required: false })
    profileImage: string

    // @Prop({ required: true })
    // userMachine: string
}



export const UserSchema = SchemaFactory.createForClass(User);
