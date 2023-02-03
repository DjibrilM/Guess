import {
    IsNotEmpty, isNotEmpty,
} from "class-validator";



export class PostDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    date: string;
}