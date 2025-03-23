import { Controller, Get, Post, Put, Delete, Res, Param, Body, HttpCode, HttpStatus, UseGuards, HttpException, ParseUUIDPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response, NextFunction } from "express"
import { from } from 'rxjs';
import { IUsers } from './users.interfaces';
import { authGuard } from 'src/auth/authGuard';
import { Users } from './entity/users.entity';
import { CreateUserDto } from './dto/user.dto';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from './enum/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    //*Funciona
    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(authGuard, RolesGuard)//Averiguar RolesGuard
    @HttpCode(HttpStatus.OK)
    async getUserList(@Res() res: Response){
        try{
            const userList = await this.usersService.getUserList()
            return res.status(200).send(userList)
        }catch(error){
            throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: "Error al obtener la lista de usuarios"
        }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    }

    //*Funciona
    @ApiBearerAuth()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(authGuard)
    async getUserById(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response){
        try{
            const getUserById = await this.usersService.getUserById(id)
            return res.status(200).send(getUserById)
        }catch(error){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Error al obtener el usuario por ID"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //*Funciona
    @ApiBearerAuth()
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(authGuard)
    async updateUserById(@Param('id', ParseUUIDPipe) id: string, @Body() updateUser: Partial<CreateUserDto>): Promise<Partial<Users>>{
        try {
            const updateUserById = await this.usersService.updateUserById(id, updateUser)
            return updateUserById
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: "Error al actualizar el usuario"
                }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //*Funciona
    @ApiBearerAuth()
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(authGuard)
    async deleteUserById(@Param('id', ParseUUIDPipe) id: string){
        try {
            const deleteUser = await this.usersService.deleteUserById(id)
            return {
                message: "Usuario eliminado con exito",
                userId: deleteUser.id
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Error al eliminar el usuario por ID, Verifica que no tenga relacionada una orden"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
