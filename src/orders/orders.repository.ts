import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/entity/users.entity";
import { Repository } from "typeorm";
import { Orders } from "./entity/orders.entity";
import { Products } from "src/products/entity/products.entity";
import { OrderDetails } from "src/order-details/entity/order-details.entity";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>
    ){}

    async addOrder(userId: string, products: { id: string }[]) {
        const user = await this.usersRepository.findOne({ where: {id: userId }});

        if (!user) {
            throw new NotFoundException('El usuario no fue encontrado');
        }

        // Crear una nueva orden
        const order = this.ordersRepository.create({ user, date: new Date() });
        const newOrder = await this.ordersRepository.save(order);

        let total = 0;
        const productsArray: Products[] = [];

        // const orderDetail = this.orderDetailsRepository.create({
        //     order: newOrder,
        //     price: 0
        // })

        for (const element of products) {
            const product = await this.productsRepository.findOne({ where: {id: element.id }});

            if (!product || product.stock <= 0) {
                throw new NotFoundException('Producto sin Stock');
            }

            total += Number(product.price);
            product.stock -= 1;
            await this.productsRepository.save(product);
            productsArray.push(product)

            //productsArray.push(product);
        }

        const orderDetail = this.orderDetailsRepository.create({
            price: parseFloat(total.toFixed(2)),
            order: newOrder,
            products: productsArray,
        });         
        
        await this.orderDetailsRepository.save(orderDetail)

        newOrder.orderDetails = orderDetail;
        await this.ordersRepository.save(newOrder)

        return this.ordersRepository.findOne({
            where: { id: newOrder.id },
            relations: ['orderDetails']
        });
    }

    async getOrder(id: string){
        const order = await this.ordersRepository.findOne(
        {
            where: { id },
            //relations: {orderDetails: {products: true}}
            relations: ['orderDetails', 'orderDetails.products']
        })
        if(!order){
            throw new NotFoundException('Numero de orden no econtrada');
        }
        return order
    }
}
