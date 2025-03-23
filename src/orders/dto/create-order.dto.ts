import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "src/products/entity/products.entity";

export class CreateOrderDto {
    
    @ApiProperty({
        required: true,
        name: 'Id de orden',
        description: 'id de ORDEN'
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        required: true,
        name: 'Id producto',
        description: 'id de producto'
    })
    @IsArray()
    @ArrayMinSize(1)//Minimo un producto
    products: Partial<Products[]>
    //products: {id: string }[]
}