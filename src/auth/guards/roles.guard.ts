import { CanActivate, Injectable, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/users/enum/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean{
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ])//Permite hacer el seteo de la informacion

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const hasRole = () => requiredRoles.some((role) => user?.roles?.includes(role));
        const valid = user && user.roles && hasRole();

        if (!valid){
            throw new ForbiddenException('Sin permiso')
        }

        return valid
    }
}