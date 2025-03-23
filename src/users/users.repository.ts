import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity'
import { Orders } from '../orders/entity/orders.entity';
import { error } from "console";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) {}

    async getUsers(page: number = 1, limit: number = 5): Promise<Users[]> {
        return this.userRepository.find({
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async getUserId(id: string){ //: Promise<Users> 
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['orders'],  // Incluye la relación con las órdenes
            select: {
                orders: {
                    id: true,
                    date: true
                }
            }
        });
        console.log(user)
        const { password, isAdmin, ...userWithOutPassword } = user

        return userWithOutPassword
    }

    async createUser(user: Partial<Users>): Promise<Partial<Users>> {
        const newUser = await this.userRepository.save(user);
        const {password, isAdmin, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async updateUserById(id: string, updateUser: Partial<Users>): Promise<Partial<Users>> {
        await this.userRepository.update(id, updateUser);
        const user = await this.userRepository.findOneBy({ id });
        const {password, isAdmin, ...seeUserUpdate} = user;
        return seeUserUpdate;
    }

    //Funciona pero se debe tener en cuenta que si tiene una orden no permite eliminar
    async deleteUser(id: string): Promise<{id: string}> {
        const user = await this.userRepository.findOneBy({id})
        if(!user){
            throw new NotFoundException("Usuario no encontrado")
        }
        await this.userRepository.delete(id);
        return { id: user.id }   
    }

    async findByEmail(email: string): Promise<Users | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }
}
