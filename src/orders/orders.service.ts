import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository } from './orders.repository';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        private ordersRepository: OrdersRepository
    ){}

    async addOrder(userId: string, products: {id: string} []){
        return this.ordersRepository.addOrder(userId, products)
    }

    async getOrder(id: string){
        return this.ordersRepository.getOrder(id)
    }
}
