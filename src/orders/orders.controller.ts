import { Body, Controller, Post, Get, Param, Query, ParseUUIDPipe, UseGuards, HttpException, HttpStatus} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "src/orders/dto/create-order.dto"
import { authGuard } from "src/auth/authGuard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('Order')
@Controller('orders')
export class OrderController{
    constructor (private readonly ordersService: OrdersService){}

    @ApiBearerAuth()
    @Post()
    @UseGuards(authGuard)
    async addOrder(@Body() order: CreateOrderDto){
        try {
            const { userId, products } = order;
            return this.ordersService.addOrder(userId, products)   
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Error al crear una orden"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(authGuard)
    getOrder(@Param('id', ParseUUIDPipe) id: string){//Si cambio a query retorna, de lo contrario no
        try{
            return this.ordersService.getOrder(id)
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Error al traer orden por id"
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}