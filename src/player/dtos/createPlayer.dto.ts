import { IsNumber, IsString } from "class-validator";

export class CreatePlayerDto {
    @IsString()
    fullName: string;

    @IsNumber()
    age: number;

    @IsString()
    clubName: string;
    
    @IsNumber()
    number: number;

    @IsString()
    country: string;
}