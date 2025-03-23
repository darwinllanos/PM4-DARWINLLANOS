import { Products } from "src/products/entity/products.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Orders } from 'src/orders/entity/orders.entity'

@Entity()
export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "decimal",
        precision: 10, 
        scale: 2,
    })
    price: number

    @OneToOne(() => Orders, (order) => order.orderDetails)
    @JoinColumn({ name: 'order_id' })
    order: Orders;

    @ManyToMany(() => Products, (product) => product.orderDetails)
    @JoinTable({ 
        name: 'order_details_products',
    })
    products: Products[];
}