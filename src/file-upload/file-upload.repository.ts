import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";
import toStream = require('buffer-to-stream');

@Injectable()
export class UploadFileRepository {
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            console.log("Buffer del archivo ", file.buffer)
            toStream(file.buffer).pipe(upload);
        });
    }
}
