import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import axios from "axios";
import * as cheerio from "cheerio";
import { Model } from "mongoose";
import { CreateProductDto } from "src/product/dto/create-product.dto";
import { ProductService } from "src/product/product.service";
import { Product } from "src/product/schema/product.schema";
import { CreateManufacturerDto } from "./dto/create-manufacturer.dto";
import { Manufacturer, ManufacturerDocument } from "./schemas/manufacturer.schema";


@Injectable()
export class ManufacturerService{
    
    constructor(
        @InjectModel(Manufacturer.name)
            private readonly manufacturerModel: Model<ManufacturerDocument>,
            private readonly productService:ProductService
        ){}



    async seedDb():Promise<any[]>{
        const data = [
            {
                manufacturer:{
                    name:"LG",
                    url:"lg.com",
                    product:[
                        {
                            name:"LG Signature",
                            url:"https://www.lg.com/africa/tvs/lg-oled88z2pua",
                            price:0,
                            model: "LG Z2 88 Inch 8K OLED Signature w/ ThinQ"
                        }
                    ]
                }
            },
            {
                manufacturer:{
                    name:"Asus",
                    url:"asus.com",
                    product:[
                        {
                            name:"Zenbook",
                            url:"https://www.asus.com/ea/laptops/for-creators/zenbook/zenbook-pro-duo-15-oled-ux582-11th-gen-intel/techspec/",
                            price:0,
                            model: "Zenbook Pro Duo 15 OLED (UX582, 11th Gen Intel®)"
                        }
                    ]
                }
            },
            {
                manufacturer:{
                    name:"Samsung",
                    url:"samsung.com",
                    product:[
                        {
                            name:"Galaxy",
                            url:"https://www.samsung.com/us/mobile/phones/galaxy-xcover/galaxy-xcover6-pro-128gb-unlocked-sm-g736uzkexaa/#specs",
                            price:0,
                            model: "Galaxy XCover6 Pro 128GB (Unlocked)"
                        }
                    ]
                }
            }
        ]

       try{
        const arr = []
        for(let i =0; i <= data.length; i++){
         const manu = (await this.manufacturerModel.create(data[i]?.manufacturer))
         const product = await (await this.productService.create({...data[i]?.manufacturer?.product[0], manufacturer:manu?._id.toString()})).populate("manufacturer")
         arr.push(product)
        }
 
 
         return arr
       }catch(error){
        console.log(error)
        
       }
    }



    
    async create(createManufacturerDto: CreateManufacturerDto):Promise<Manufacturer>{
        try{
            const isExist = await this.manufacturerModel.findOne({name:createManufacturerDto.name}).exec()
            if(isExist){
                throw new HttpException("Manufacturer already exist", HttpStatus.CONFLICT)
            }
            return await this.manufacturerModel.create(createManufacturerDto)
        }catch(error){
            // implement logger
            throw new HttpException(error.response, error.status)
        }
    }


    async fetchAll():Promise<Manufacturer[]>{
        try{
            return await this.manufacturerModel.find().exec()
        }catch(error){
            console.log(error)
        }
    }

    async fetchProducts(manufacturerId:string):Promise<Product[]>{
        try{
            return await this.productService.fetchAll(manufacturerId)
        }catch(error){
            throw new HttpException(error.response, error.status)
        }
    }


    async createProduct(createProductDto:CreateProductDto):Promise<Product>{
        try{
            return await this.productService.create(createProductDto)
        }catch(error){
            throw new HttpException(error.response, error.status)
        }
    }


    async scrapeProductSpec(id:string):Promise<object>{

        const product =  await this.productService.fetchById(id)

        if(!product){
            throw new HttpException("Product is not found", HttpStatus.NOT_FOUND)
        }

        const response = await axios.get(product.url)
        const $ = cheerio.load(response.data)

        let responseData = {}

        // Fetch Asus Spec
      if(product.manufacturer.name == 'Asus'){
        const data = $('.TechSpec__techSpecContainer__GSlpY div')
        
        for(let i =0; i <= data.length; i++){
            let title = $(data[i]).find('h2').text().trim()
            let value = $(data[i]).find('.TechSpec__content__2E2e_').text().trim()
           if(title !== '' || value !== ''){
            responseData[title] = value
           }
        }
      }

      //Fetch Samsung Spec
      if(product.manufacturer.name == 'Samsung'){
        const data = $('.sub-specs__item')
        for(let i =0; i <= data.length; i++){
            let title = $(data[i]).find('.specs-item-name').text().trim()
            let value = $(data[i]).find('.sub-specs__item__value').text().trim()
           if(title !== '' || value !== ''){

            responseData[title] = value
           
           }
        }
      }

        // Fetch LG Spec
      if(product.manufacturer.name == 'LG'){
        const data = $('.tech-spacs-contents ul li dl')
        for(let i =0; i <= data.length; i++){
            let title = $(data[i]).find('dt').text().trim()
            let value = $(data[i]).find('dd').text().trim()
           if(title !== '' || value !== ''){

            responseData[title] = value
           
           }
        }
      }

        return responseData
    }

  

}