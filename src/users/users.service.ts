import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { IUsers } from './users.interfaces';
import { Users } from './entity/users.entity';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository){}
    
    async getUserList(): Promise<Omit<Users, 'password'>[]>{
        const users = await this.userRepository.getUsers()
        return users.map(({password, ...rest}) => rest);//Nos permite excluir la contraseña
    }

    async getUserById(id: string){//: Promise<Omit<Users, 'password'>>
        const user = await this.userRepository.getUserId(id);
        //const { password, ...res } = user;
        return user;
    }

    async createUser(user: Partial<Users>){
        return await this.userRepository.createUser(user)
    }

    async updateUserById(id: string, user: Partial<Users>): Promise<Partial<Users>>{
        return await this.userRepository.updateUserById(id, user)
    }

    async deleteUserById(id: string): Promise<{id: string}>{
        return await this.userRepository.deleteUser(id)
    }
}
