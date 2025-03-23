import { ApiProperty, PickType } from "@nestjs/swagger";
import { isNotEmpty, IsString, IsNotEmpty, IsEmail, IsEmpty, Length, isEmail, Matches, isEmpty, length, isStrongPassword, IsNumber, isString, IsOptional } from "class-validator";

// ACTIVIDAD 02 
// Crear los DTOs CreateUserDto y CreateOrderDto, e 
// implementarlos en los POST y PUT correspondientes 
// CreateUserDto 


export class CreateUserDto {
    @ApiProperty({
        required: true,
        name: 'El usuario es obligatorio'
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;

    @ApiProperty({
        required: true,
        name: 'El correo debe contener un @'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true,
        name: 'La contraseña debe tener al menos una letra minúscula, una mayúscula, un número y un carácter especial de entre !@#$%^&*. Ademas debe contener entre 8 y 15 caracteres'
    })
    @IsNotEmpty()
    @Length(8, 15, {message: 'La constraseña debe contener entre 8 y 15 caracteres'})
    //@IsStrongPassword()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
        { message: 'La contraseña debe tener al menos una letra minúscula, una mayúscula, un número y un carácter especial de entre !@#$%^&*.' }
    )
    password: string;

    @ApiProperty({
        required: true,
        description: 'Verificar la contraseña'
    })
    @IsNotEmpty()
    confirmPassword: string;

    @ApiProperty({
        required: true,
        description: 'Dirreccion de residencia'
    })
    @Length(3, 80)
    @IsString()
    address: string;

    @ApiProperty({
        required: true,
        description: 'El numero solo admite numeros'
    })
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @ApiProperty({
        description: 'Pais de residencia'
    })
    @Length(5, 20)
    @IsString()
    @IsOptional()
    country: string;

    @ApiProperty({
        description: 'Ciudad de residencia'
    })
    @Length(5, 20)
    @IsString()
    @IsOptional()
    city: string;

    @ApiProperty({
        description: 'El valor por defecto de admin sera false'
    })
    @IsEmpty()
    isAdmin?: boolean;
}

/*export class LoginUserDto extends PickType(CreateUserDto, [//npm install @nestjs/swagger para no repetir las propiedades del DTO
    'password',
    'email'
]) {}*/