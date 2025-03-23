import { Column, JoinColumn, OneToMany, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Products } from 'src/products/entity/products.entity'

@Entity()
    export class Categories{
        @PrimaryGeneratedColumn('uuid')
        id: string

        @Column({
            type: "varchar",
            length: 50,
            nullable: false
        })
        name: string

        @OneToMany(() => Products, (product) => product.category)
        //@JoinColumn({})
        products: Products[];
    }
