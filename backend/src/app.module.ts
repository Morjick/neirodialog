import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { SocialModule } from './social/social.module';
import {SequelizeModule} from "@nestjs/sequelize"
import { Social } from './social/social.model'
import { ProductModule } from './product/product.module';
import { Product } from './product/product.model';
import { UsersModule } from './users/users.module';
import { DiscountModule } from './discount/discount.module';
import { User } from './users/users.model';
import { Discount } from './discount/discount.model';
import { LearnModule } from './learn/learn.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Social, Product, User, Discount],
      autoLoadModels: true,
      synchronize: true,
      sync: {
        alter: true
      },
      logging: false
    }),
    SocialModule,
    ProductModule,
    UsersModule,
    DiscountModule,
    LearnModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
