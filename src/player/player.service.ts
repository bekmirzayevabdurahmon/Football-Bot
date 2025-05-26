import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Player, PlayerDocument } from "./model";
import { Model } from "mongoose";
import { CreatePlayerDto } from "./dtos";
import * as path from "node:path"
import * as fs from "node:fs"

@Injectable()
export class PlayerService {
    constructor(
        @InjectModel('Player') private playerModel: Model<PlayerDocument>,
    ) {}

    async getAll() {
        const players = await this.playerModel.find().exec()
        
        return {
            message: "Success ✅",
            data: players,
        }
    }

    async create(payload: CreatePlayerDto, file: Express.Multer.File) {
        const ext = path.extname(file.originalname); 
        const safeName = payload.fullName.toLowerCase().replace(/\s+/g, '_'); 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        const fileName = `${safeName}-${uniqueSuffix}${ext}`;

        const uploadPath = path.join(__dirname, '../../uploads', fileName);
        await fs.promises.writeFile(uploadPath, file.buffer);

        const newPlayer = new this.playerModel({
            ...payload,
            image: fileName, 
        });

        const savePlayer = await newPlayer.save();

        return {
            message: "Success ✅",
            data: savePlayer,
        };
    }
}