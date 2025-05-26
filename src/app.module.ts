import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot';
import { PlayerModul } from './player/player.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN ? "8101494897:AAFBcW9fJr0-QaH_fw_SDunOHa_cr5vJuvE" : "8101494897:AAFBcW9fJr0-QaH_fw_SDunOHa_cr5vJuvE"
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/futbol-bot'),
    BotModule,
    PlayerModul,
  ],
})
export class AppModule {}
