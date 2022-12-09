import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "src/product/product.module";
import { ManufacturerController } from "./manufacturer.controller";
import { ManufacturerService } from "./manufacturer.service";
import { Manufacturer, ManufacturerSchema } from "./schemas/manufacturer.schema";


@Module({
    providers:[ManufacturerService],
    controllers:[ManufacturerController],
    imports:[
        MongooseModule.forFeature([{name:Manufacturer.name, schema:ManufacturerSchema}]),
        ProductModule]

})
export class ManufacturerModule{}