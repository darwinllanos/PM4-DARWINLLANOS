import { OrderDetails } from "src/order-details/entity/order-details.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "src/categories/entity/categories.entity";

@Entity()
export class Products{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    name: string;

     @Column({
        type: 'text',
        nullable: false
     })
     description: string;

     @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
     })
     price: number

     @Column({
        type: 'int',
        nullable: false
     })
     stock: number;

    @Column({
        type: 'varchar',
        length: 255,
        default: 'https://example.com/default-image.png',
    })
    imgUrl: string;

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails[]

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({ name: 'category_id'})
    category: Categories;
}
