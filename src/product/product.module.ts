import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductService } from "./product.service";
import { Product, ProductSchema } from "./schema/product.schema";



@Module({
    providers:[ProductService],
    controllers:[],
    imports:[MongooseModule.forFeature([{name:Product.name, schema:ProductSchema}])],
    exports:[ProductService]
})
export class ProductModule{}