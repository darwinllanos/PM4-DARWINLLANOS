import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, isNumber, IsNumber, IsString, IsUrl } from "class-validator";
import { IsNull } from "typeorm";

export class CreateProductDto {
    @ApiProperty({
        description: 'Nombre del producto, debe ser una cadena de texto.',
        example: 'iPhone 12',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Descripción del producto, debe ser una cadena de texto.',
        example: '128GB de almacenamiento, batería de 3500mAh.',
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'El precio del producto, debe ser un valor numérico.',
        example: 3700000,
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'El stock del producto, debe ser un valor numérico.',
        example: 12,
    })
    @IsNumber()
    stock: number;

    @ApiProperty({
        description: 'URL de la imagen del producto, debe ser una cadena con formato de URL.',
        example: 'https://example.com/default-image.png',
    })
    @IsUrl()
    imgurl: string;
}
