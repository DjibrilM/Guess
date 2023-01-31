import {
    HttpStatus,
    NestMiddleware,
} from "@nestjs/common";
import { Response, Request, NextFunction } from "express";
import { Post, postDocument, } from "src/schemas/post.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import mongoose from "mongoose";

export class authenticaionMiddleware implements NestMiddleware {
    constructor(@InjectModel(Post.name) private postModel: Model<postDocument>) { }
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const headerString: any = req.headers.authorization;
            const getauthToken = headerString.split(' ')[1];
            const getAuthCookie: string = req.cookies['identifier'];

            let authId: string;
            let cookieId: string;

            if (!getauthToken) {
                const error = new Error;
                error.message = 'authentication fails';
                throw error;
            }

            // check authToken 
            try {
                const checkAutToken = await jwt.verify(getauthToken, 'password');
                authId = checkAutToken.id;
            } catch (err) {
                const error = new Error;
                error.message = 'invalid-authtoken';
                console.log(err);
                throw error;
            }

            //check authCookie 
            try {
                const checkCookieAuth = await jwt.verify(getAuthCookie, 'passwordeiodikjdedc');
                cookieId = checkCookieAuth.id;
            } catch (err) {
                const error = new Error;
                error.message = 'invalid-authtoken';
                throw error;
            }

            //check ids validation 
            if (cookieId === authId) {
                try {
                    const id = new mongoose.mongo.ObjectID(cookieId);
                    const findUser = await this.postModel.find();
                    req.user = 'djibril';
                    console.log(findUser, 'finded user')

                    next();
                } catch (error) {
                    console.log(error);
                }
            } else {
                const error = new Error;
                error.message = 'invalid-authtoken';
                throw error;
            } ///

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: error.message
            }, HttpStatus.FORBIDDEN, {
                cause: error
            })
        }
    }
}


