import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createSocialDto } from './dto/create-social.dto';
import { Social } from './social.model';

@Injectable()
export class SocialService {
  constructor(@InjectModel(Social) private socailRepository: typeof Social) {}

  async createSocial(dto: createSocialDto) {

  }

  async getSocial() {
    const social = await this.socailRepository.findAll()

    return {
      ok: true,
      message: 'Данные найены',
      social
    }
  }

  async updateSocial(socialData) {
    try {
      const social = await this.socailRepository.findOne({ where: { id: 1 } })
    
      if(social) {
        await this.socailRepository.update({ ...socialData }, { where: { id: 1 } })
      }
      else {
        await this.socailRepository.create({ ...socialData })
      }

      const newSocial = await this.socailRepository.findOne({ where: { id: 1 } })

      return {
        ok: true,
        sucsess: true,
        social: newSocial
      }
    } catch(e) {
      return {
        ok: false,
        sucsess: false,
        errors: e,
      }
    }
  }
}
