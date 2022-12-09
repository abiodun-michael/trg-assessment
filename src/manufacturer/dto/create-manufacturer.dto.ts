import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUrl } from "class-validator"



export class CreateManufacturerDto{

    @ApiProperty({
        type:String,
        description:"Name of the manufacture"
    })
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({
        type:String,
        description:"url of the manufacture website"
    })
    @IsNotEmpty()
    @IsUrl()
    url:string
}