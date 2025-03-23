import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Products } from 'src/products/entity/products.entity';
import { Orders } from './entity/orders.entity';
import { OrderDetails } from 'src/order-details/entity/order-details.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, Products, Orders, OrderDetails])
    ],
    providers: [OrdersService, OrdersRepository],
    controllers: [OrderController],
    exports: [OrdersService, OrdersService, OrdersRepository]
})
export class OrdersModule {}
