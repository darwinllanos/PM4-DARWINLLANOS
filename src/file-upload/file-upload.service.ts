import { Injectable } from '@nestjs/common';
import { UploadFileRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entity/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor(
        private readonly fileUploadRepository: UploadFileRepository,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>
    ){}

    async uploadProductImage(file: Express.Multer.File, productId: string){
        console.log("Product id", productId)
        console.log("Archivo recibido", file)
        const product = await this.productsRepository.findOneBy({id: productId});
        if(!product){
            console.log("Producto no encontrado")
            return "El producto no existe"
        }
        console.log("Subiendo imagen a cloudinary")
        const uploadImage = await this.fileUploadRepository.uploadImage(file)
        console.log("Imagen subida", uploadImage)

        await this.productsRepository.update(productId,{
            imgUrl: uploadImage.secure_url
        })

        const updateProduct = this.productsRepository.findOneBy({
            id: productId
        })

        console.log("Producto actualizado")
        return updateProduct
    }
}
