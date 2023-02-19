import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiscountController } from './discount.controller';
import { Discount } from './discount.model';
import { DiscountService } from './discount.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Discount])
  ],
  providers: [DiscountService, JwtService],
  controllers: [DiscountController]
})
export class DiscountModule {}
