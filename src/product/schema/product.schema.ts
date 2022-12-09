import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Manufacturer } from 'src/manufacturer/schemas/manufacturer.schema';

export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product {

  @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Manufacturer'})
  manufacturer:Manufacturer

  @Prop()
  name: string;

  @Prop()
  model: string;

  @Prop()
  price: number;

  @Prop()
  url: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);