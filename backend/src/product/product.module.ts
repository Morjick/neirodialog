import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductController } from './product.controller';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, JwtService, UsersService],
  imports: [
    SequelizeModule.forFeature([Product, User])
  ]
})
export class ProductModule {}
