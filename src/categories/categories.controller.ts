import { Controller, Get, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService){}

    @HttpCode(HttpStatus.OK)
    @Get('seeder')
    addCategories() {
        try{
            return this.categoriesService.addCategories();
        }catch (error){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Las categorias han sido cargadas con anterioridad'
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }

    @Get()
    getCategories(){
        try {
            return this.categoriesService.getCategories();    
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error al traer el producto'
            },HttpStatus.INTERNAL_SERVER_ERROR)   
        }
    }
}
