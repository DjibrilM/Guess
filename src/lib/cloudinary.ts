
import { v2 } from 'cloudinary';
import { join, } from 'path';
export const uploadImage = async (path: string) => {
    const promise = new Promise(async (resolve: Function, rejects: Function) => {
        try {

            const api_key = process.env.CLOUDINARY_API_KEY
            const api_secret = process.env.CLOUDINARY_API_SECRET

            const config = v2.config({
                cloud_name: 'djibri-tech',
                api_key: api_key,
                api_secret: api_secret,
                secure: true
            })
            const upload = await v2.uploader.upload(path);
            resolve(upload);
        } catch (error) {
            console.log(error);
        }
    })

    return promise
}

// const deleteImage = async () => {
//     var cloudinary = require('cloudinary');
//     cloudinary.v2.uploader
//         .destroy('sample',
//             resource_type: 'video')
//         .then(result => console.log(result));
// }