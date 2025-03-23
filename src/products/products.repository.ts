import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { IProducts } from "./products.inteface";
import { error } from "console";
import { start } from "repl";

import { Categories } from "src/categories/entity/categories.entity";
import * as data from '../utils/data.json';
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./entity/products.entity";
import { Repository } from "typeorm";
@Injectable()

export class ProductsRepository{
    constructor(
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(Categories) private categoriesRepository: Repository<Categories>
    ){}
 
    async getProducts(page: number = 1, limit: number = 5){
        const startIndex = (page - 1) * limit;
        const products = await this.productsRepository.find({
            relations: {
                category: true
            }
        })

        let inStock = products.filter((product) => product.stock >= 0)

        const start = (page - 1) * limit;
        const end = start + limit;//const end = start + +limit (La otra opcion);

        inStock = inStock.slice(start, end)

        return inStock
    }

    async getProductsId(id: string){
        try {
            const product = await this.productsRepository.findOneBy({ id });
            if(!product){
                throw new NotFoundException('Producto no encontrado')
            }   
            return product
        } catch (error) {
            console.error("Error al obtener el producto", error);
            throw new InternalServerErrorException('Error en la consulta del producto')
        }
    }

    async updateProductById(id: string, product: Partial<Products>):Promise<Partial<Products>>{
        await this.productsRepository.update(id, product);
        const updateProduct = await this.productsRepository.findOneBy({ id })
        return updateProduct
    }

    async deleteProductsById(id: string){
        try {
            const deleteProduct = await this.productsRepository.delete(id);
            if(deleteProduct.affected === 0){
                throw new NotFoundException("No se pudo eliminar el producto")
            }
            return { id }
        } catch (error) {
            throw new InternalServerErrorException("Error al eliminar producto o producto referenciado en otra tabla")
        }
        return "El producto ha sido eliminado";
    }

    async addProducts(){
        const categories = await this.categoriesRepository.find();

        for(const item of data){
            const category = categories.find(cat => cat.name === item.category)

            if(category){
                const product = this.productsRepository.create({
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    stock: item.stock,
                    category: category
                });
                await this.productsRepository.save(product)
            }
        }
        return "Productos Agregados"
    }

    async createProduct(product: Products){
        const newProduct = await this.productsRepository.save(product);
        return newProduct
    }

    // async searchProductByCategory(id: string): Promise<Product[]>{
    //     return searchProduct = await this.categoriesRepository.find({
    //         where: Categories: { id: id },
    //         relations: ['categories']
    //     })
}

