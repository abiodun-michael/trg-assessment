import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "src/product/dto/create-product.dto";
import { Product } from "src/product/schema/product.schema";
import { CreateManufacturerDto } from "./dto/create-manufacturer.dto";
import { ManufacturerService } from "./manufacturer.service";
import { Manufacturer } from "./schemas/manufacturer.schema";


@ApiTags("Manufacturer")
@Controller("manufacturer")
export class ManufacturerController{

    constructor(
        private readonly manufacturerService: ManufacturerService
    ){}

    @Get()
    async fetchAll():Promise<Manufacturer[]>{
        return await this.manufacturerService.fetchAll()
    }


    @Get("seed")
    async seedDb():Promise<Manufacturer[]>{
        return await this.manufacturerService.seedDb()
    }

    @Get(":id/products")
    async fetchProducts(@Param("id") id:string):Promise<Product[]>{
        return this.manufacturerService.fetchProducts(id)
    }

    @Post()
    async create(@Body() createManufacturerDto:CreateManufacturerDto):Promise<Manufacturer>{
        console.log(createManufacturerDto)
        return await this.manufacturerService.create(createManufacturerDto)
    }


    @Post("product")
    async createProduct(@Body() createProductDto:CreateProductDto):Promise<Product>{
        return await this.manufacturerService.createProduct(createProductDto)
    }

    @Get("product/:id/spec")
    async fetchProductSpec(@Param("id") id:string):Promise<object>{
        return this.manufacturerService.scrapeProductSpec(id)
    }
    
}