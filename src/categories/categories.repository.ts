import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "./entity/categories.entity";
import { Repository } from "typeorm";
import * as data from 'src/utils/data.json';

@Injectable()
export class CategoriesRepository {
    constructor(@InjectRepository(Categories) private categoriesRepository: Repository<Categories>){}

    async getCategories(){
        return await this.categoriesRepository.find()
    }

    async addCategories(){
        const categories = data.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index) //Sirve para obtener categorias unicas

        for (const categoryName of categories){
            const categoryExist = await this.categoriesRepository.findOne(
                {
                    where: {name: categoryName}
                }
            )
            if (!categoryExist){
                const newCategory = this.categoriesRepository.create({name: categoryName})
                await this.categoriesRepository.save(newCategory)
            }
        }

        return `Categorias añadidas ${categories}`
    }
}