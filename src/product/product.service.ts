import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product, ProductDocument } from "./schema/product.schema";



@Injectable()
export class ProductService{
    constructor(
        @InjectModel(Product.name)
        private readonly productModel:Model<ProductDocument>
    ){}

    async create(createProductDto:CreateProductDto){
        try{
            const isExist = await this.productModel.findOne({model:createProductDto.model, manufacturer:createProductDto.manufacturer})
            if(isExist){
                throw new HttpException("Product already exist", HttpStatus.CONFLICT)
            }

            return await this.productModel.create(createProductDto)
        }catch(error){
            throw new HttpException(error.response, error.status)
        }
    }

    async fetchAll(manufacturer:string):Promise<Product[]>{
        try {
            return await this.productModel.find({manufacturer})
        } catch (error) {
            throw new HttpException(error.response, error.status)
        }
    }

    async fetchById(id:string):Promise<Product>{
        try {
            return await this.productModel.findById(id).populate("manufacturer")
        } catch (error) {
            throw new HttpException(error.response, error.status)
        }
    }
}