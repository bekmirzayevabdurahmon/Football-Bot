import { Body, Controller, Get, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import { PlayerService } from "./player.service";
import { CreatePlayerDto } from "./dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from "multer"

@Controller()
export class PlayerController {
    constructor( private service: PlayerService) {}

    @Get()
    async getAll () {
        return this.service.getAll()
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', { storage: multer.memoryStorage() }))
    async create(
        @Body() payload: CreatePlayerDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.service.create(payload, file)
    }
}