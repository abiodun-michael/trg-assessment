import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { IsNumber, IsString, IsUrl } from "class-validator"




export class CreateProductDto{
    @ApiProperty({
        type:String,
        description:"The product manufacturer"
    })
    @IsNotEmpty()
    @IsString()
    manufacturer:string

    @ApiProperty({
        type:String,
        description:"Name of the product"
    })
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({
        type:String,
        description:"Color of the product"
    })

    @ApiProperty({
        type:String,
        description:"Model of the product"
    })
    @IsNotEmpty()
    @IsString()
    model:string

    @ApiProperty({
        type:Number,
        description:"Price of the product"
    })
    @IsNotEmpty()
    @IsNumber()
    price:number

    @ApiProperty({
        type:String,
        description:"Url of the product"
    })
    @IsNotEmpty()
    @IsUrl()
    url:string
}