import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UserRepository } from 'src/users/users.repository';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/users/enum/roles.enum';


@Injectable()
export class AuthService {

    constructor(private readonly userRepository: UserRepository,
        private jwtService: JwtService
    ){}
    
    async signIn(email: string, password: string){
        if(!email || !password){
            throw new BadRequestException('Email y password requerido')
        }
        
        const user = await this.userRepository.findByEmail(email)
        if(!user){
            throw new BadRequestException('Email o usuario incorrecto')
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            throw new BadRequestException('Email o usuario incorrecto')
        }

        const userPayLoad = {
            id: user.id,
            email: user.email,
            roles: [user.isAdmin ? Role.Admin : Role.User]
        }

        const token = this.jwtService.sign(userPayLoad)

        return {
            token,
            message: 'Login exitoso'
        }
    }

    async signUp(user: CreateUserDto) {
        const foundUser = await this.userRepository.findByEmail(user.email)
        if(foundUser){
            throw new BadRequestException('El usuario ya se encuentra registrado')
        }

        if(user.password !== user.confirmPassword){
            throw new BadRequestException('Las contraseñas no coinciden')
        }

        const hashedPassword = await bcrypt.hash(user.password, 10)

        if(!hashedPassword){
            throw new BadRequestException('Error al hashear')
        }

        await this.userRepository.createUser({
            ...user,
            password: hashedPassword
        })

        const { password, confirmPassword, ...userWhitoutPassword } = user
        return userWhitoutPassword;
    }
}
