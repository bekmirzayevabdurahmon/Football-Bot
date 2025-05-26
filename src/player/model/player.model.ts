import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    age: number;

    @Prop({ required: true })
    clubName: string;

    @Prop({ required: true })
    number: number;

    @Prop({ required: true })
    country: string;

    @Prop()
    image: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player)