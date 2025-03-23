import { Users } from "src/users/entity/users.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn , Column} from "typeorm";
import { OrderDetails } from "src/order-details/entity/order-details.entity";

@Entity()
export class Orders{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'timestamp',
        nullable: false
    })
    date: Date

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails;

    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: Users;
}