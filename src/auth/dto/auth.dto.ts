import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class LoginUserDto{
    @ApiProperty({
        required: true,
        name: 'email',
        description: 'El correo debe estar en la BD'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true,
        name: 'password',
        description: 'Ingresar contraseña del usuario'
    })
    @IsNotEmpty()
    password: string;
}