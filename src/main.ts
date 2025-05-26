import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 6000

  await app.listen(port, () => {
    console.log(`Server running on port ${port} ✅`)
  });
}
bootstrap();
