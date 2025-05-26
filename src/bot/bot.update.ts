import { Ctx, Help, On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";
import * as fs from "node:fs"
import * as path from "node:path"
import { PlayerService } from "src/player/player.service";

@Update()
export class BotUpdate {
    constructor(private readonly playerService: PlayerService) {}

    @Start()
    async start(@Ctx() ctx: Context) {
        const imageStart = path.join(process.cwd(), 'static', 'photo.png');
        await ctx.replyWithPhoto(
            { source: fs.readFileSync(imageStart)},
            {
                caption: `Assalomu alaykum 👋\nUshbu bot orqali futbol haqida ma'lumot olishingiz mumkin ✅`,
            },
        );
    }

    @Help()
    async help(@Ctx() ctx: Context) {
        const imageHelp = path.join(process.cwd(), 'static', 'image.png')
        await ctx.replyWithPhoto(
            { source: fs.readFileSync(imageHelp) },
            { caption: `Agar botda biror-bir muammo bo'lsa  @Abdurahmon_Bekmirzayev ushbu akkountga yozing ✅`}
        )
    }

    @On("message")
    async message(@Ctx() ctx: Context & { message: { text: string } }) {
        const query = ctx.message.text.trim().toLowerCase();
        await ctx.reply("Qidirilmoqda... ⏳");

        const allPlayers = await this.playerService.getAll();
        const players = allPlayers.data;

        const found = players.filter(p =>
            p.fullName.toLowerCase().includes(query)
        );

        if (found.length > 0) {
            for (const player of found) {
                const info = `👤 Ism: ${player.fullName}\n📅 Yosh: ${player.age}\n⚽️ Jamoa: ${player.clubName}\n🌍 Mamlakat: ${player.country}\n🎱 Raqam: ${player.number}`;

                if (player.image) {
                    const imagePath = path.join(process.cwd(), 'uploads', player.image);
                    if (fs.existsSync(imagePath)) {
                        await ctx.replyWithPhoto(
                            { source: fs.createReadStream(imagePath) },
                            { caption: info }
                        );
                    } else {
                        await ctx.reply(info);
                    }
                } else {
                    await ctx.reply(info);
                }
            }
        } else {
            await ctx.reply("⚠️ Afsuski, bu ismga mos futbolchi topilmadi.");
        }
    }
}