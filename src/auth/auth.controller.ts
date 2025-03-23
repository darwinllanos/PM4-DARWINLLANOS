import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('signin')//Iniciar sesion
    signIn(@Body() credentials: LoginUserDto){
        const { email, password } = credentials
        try {
            return this.authService.signIn(email, password)    
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Error al intetar autenticar el usuario"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('signup')//Crear usuario
    signUp(@Body() user: CreateUserDto){
        try {
            return this.authService.signUp(user)    
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Error al realizar la creacion del usuario"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
