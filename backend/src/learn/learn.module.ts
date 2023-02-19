import { Module } from '@nestjs/common';
import { LearnService } from './learn.service';
import { LearnController } from './learn.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Learn } from './learn.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [LearnService, JwtService],
  controllers: [LearnController],
  imports: [
    SequelizeModule.forFeature([Learn])
  ]
})
export class LearnModule {}
