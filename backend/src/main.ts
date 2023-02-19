import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const PORT = process.env.PORT || 5000

  const config = new DocumentBuilder()
    .setTitle('Neirodialog')
    .setDescription('Neirodialog open api')
    .setVersion('1.0')
    .addTag('neirodialog api')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT)
}
bootstrap()
