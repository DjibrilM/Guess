// 372323713825336
// mttacHyw9WtokhtMszzbJu1eQys secret 
import { v2 } from 'cloudinary';


const uploadAtCloudinary = async (path: string) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    }

    const promise = new Promise(async (resolve, reject) => {
        v2.uploader.upload(path, {
            
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    })
}