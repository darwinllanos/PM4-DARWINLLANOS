import { Entity, PrimaryGeneratedColumn , Column, OneToMany, JoinColumn} from "typeorm";
import { Orders } from 'src/orders/entity/orders.entity';

@Entity()
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false, //*
        unique: true //Es una regla
    })
    email: string

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false
    })
    password: string

    @Column({
        type: 'bigint',
        nullable: true
    })
    phone: number;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    country: string;

    @Column({
        type: 'text',
        nullable: true
    })
    address: string

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    city: string;

    @Column({
        type: 'boolean',
        default: false
    })
    isAdmin: boolean

    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({name: 'orders_id'})
    orders: Orders[];
}