import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Role } from "src/users/enum/roles.enum";

@Injectable()
export class authGuard implements CanActivate{

    constructor(private jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = request.headers.authorization?.split(' ')[1];//!Obtiene el token de los headers de autorizacion, asumiendo el formato "Bearer <token>"

        //*Excepcion de autorizacion
        if(!token){
            throw new UnauthorizedException('Error de token')
        }

        try {
            const secret = process.env.JWT_SECRET;//!Recupera la clave secreta

            const user = this.jwtService.verify(token, { secret })//!Verifica el token
            user.exp = new Date(user.exp * 1000);//!Convierte los tiempos a fechas
            user.iat = new Date(user.iat * 1000);//!Convierte los tiempos a fechas
            //user.roles = [Role.Admin]
            request.user = user;//!Añade la informacion del usuario

            return true
        } catch (error) {
            //!Si hay un error al verificar el token, lanza una excepcion de autorizacion
            throw new UnauthorizedException('Token no valido')
        }
    }
}