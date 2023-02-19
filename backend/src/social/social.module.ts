import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Social } from './social.model';

@Module({
  providers: [SocialService],
  controllers: [SocialController],
  imports: [
    SequelizeModule.forFeature([Social])
  ]
})
export class SocialModule {}
