import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { IProducts } from './products.inteface';
import { Products } from './entity/products.entity';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository){}

    async getProductsList(page: number = 1, limit: number = 5){
        return await this.productsRepository.getProducts(page, limit);
    }

    async getProductsById(id: string){
        return await this.productsRepository.getProductsId(id);
    }

    async createProduct(product: any){
         product.price = parseFloat(product.price as unknown as string)
         return await this.productsRepository.createProduct(product);
     }

    async addProducts(){
        return this.productsRepository.addProducts()
    }

    async updateProductById(id: string, product: Partial<Products>): Promise<Partial<Products>>{
        return await this.productsRepository.updateProductById(id, product);
    }

    async deleteProductById(id: string){
        return await this.productsRepository.deleteProductsById(id);
    }

    // async updateProductByCategoria(id: string){
    //     return await this.productsRepository.searchProductByCategory(id)
    // }
}
