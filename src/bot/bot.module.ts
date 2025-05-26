import { Module } from "@nestjs/common";
import { BotUpdate } from "./bot.update";
import { PlayerModul } from "src/player/player.module";

@Module({
    imports: [PlayerModul],
    providers: [BotUpdate]
})

export class BotModule {}