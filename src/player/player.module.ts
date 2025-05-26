import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Player, PlayerSchema } from "./model";
import { PlayerController } from "./player.controller";
import { PlayerService } from "./player.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Player', schema: PlayerSchema}])],
    controllers: [PlayerController],
    providers: [PlayerService],
    exports: [PlayerService],
})

export class PlayerModul {}