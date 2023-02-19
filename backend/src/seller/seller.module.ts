import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Seller } from './seller.model';

@Module({
  providers: [SellerService],
  controllers: [SellerController],
})
export class SellerModule {}
