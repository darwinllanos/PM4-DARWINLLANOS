import { Controller, Get, Post, Put, Delete, Req, Res, Param, Next, Body, HttpCode, HttpStatus, Query, UseGuards, ParseUUIDPipe, HttpException} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Request, Response, NextFunction, response} from "express";
import { IProducts } from './products.inteface';
import { validateProduct } from 'src/utils/validate';
import { authGuard } from 'src/auth/authGuard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/enum/roles.enum';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Products } from './entity/products.entity';
import { CreateProductDto } from './dto/product.dto';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}
    //*Funciona
    @Get('')
    @HttpCode(HttpStatus.OK)
    async getProductList(@Query('page')page: number,@Query('limit')limit: number = 5 ,@Res() response: Response){
        try {
            const products = await this.productsService.getProductsList(page, limit);
            return response.status(HttpStatus.OK).json(products)   
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Error al obtener la lista de productos"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //*Funciona
    @Get('seeder')
    async createProducts(){
        try {
            return await this.productsService.addProducts()
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Los productos ya han sido cargados con anterioridad"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // @Get(':id')
    // async getProductByCategory(@Param('id', ParseUUIDPipe) id: string){
    //     return this.productsService.updateProductByCategoria(id)
    // }

    //*Funciona
    @Get(':id')
    //@HttpCode(HttpStatus.OK)
    async getProductsById(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response){
        try {
            const product = await this.productsService.getProductsById(id);
            if(!product){
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: "Producto no encontrado"
                }, HttpStatus.NOT_FOUND)
            }
            return res.status(HttpStatus.OK).json(product)
        } catch (error) {
            throw new HttpException({
                status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
                error: error.message || "Error al obtener producto"
            }, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //!crear producto
    @Post()
    @HttpCode(HttpStatus.OK)
     async createProduct(@Body() product: CreateProductDto){
        try {
            return await this.productsService.createProduct(product)   
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error al crear producto'
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
         
     }

    //*Funciona pero se dbe tener en cuenta que si el producto no existe deberia retorname "Producto no encontrado"
    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(authGuard, RolesGuard)//Repasar el RolesGuard
    @HttpCode(HttpStatus.OK)
    async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: Partial<CreateProductDto>):Promise <Partial<Products>>{
        try {
            const updatedProduct = await this.productsService.updateProductById(id, product);
            if (!updatedProduct) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: "Producto no encontrado"
                }, HttpStatus.NOT_FOUND);
            }
            return updatedProduct
        } catch (error) {
            throw new HttpException({
                status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
                error: error.message || "Error al actualizar el producto"
            }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //*Funciona pero se debe revisar el tema de que si no se encuentra el producto me retorne un producto no encontrado
    @ApiBearerAuth()
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteProduct(@Param('id', ParseUUIDPipe)id: string, @Res() res: Response){
        try {
            const deletedProduct = await this.productsService.deleteProductById(id);
            console.log(deletedProduct)
            if (!deletedProduct) {
                 throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: "Producto no encontrado"
                 }, HttpStatus.NOT_FOUND);
            }
            return res.status(HttpStatus.OK).json({
                message: "Producto eliminado con éxito",
                productId: deletedProduct
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Error al eliminar el producto"
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
