import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ManufacturerDocument = HydratedDocument<Manufacturer>;

@Schema()
export class Manufacturer {
  @Prop()
  name: string;

  @Prop()
  url: string;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);