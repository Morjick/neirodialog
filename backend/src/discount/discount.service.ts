import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import generateRandomFunction from 'src/vendor/generateRandomString';
import { Discount } from './discount.model';
import { createDiscountDto } from './dto/create-discount.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount) private discountReposity: typeof Discount,
    private jwt: JwtService,
  ) {}

  async createPromo(dto: createDiscountDto, { authorization }) {
    try {
      const random = await generateRandomFunction(10)

      const token = authorization.split(' ')[1]
      const verify = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET_KEY
      })

      const name = verify.name

      const discount = await this.discountReposity.create({ ...dto, promo: random, autor: name })

      return {
        discount,
        ok: true,
        sucses: true
      }
    } catch(e) {
      return {
        error: e,
        message: 'Неожиданная ошибка сервера'
      }
    }
  }

  async updatePromo(dto: createDiscountDto, id) {
    try {
      if(!id || !Number(id)) return {
        message: 'Не удалось найти промокод',
        ok: false,
        sucses: false
      }

      const promo = await this.discountReposity.update({ ...dto }, { where: { id } })

      return {
        promo,
        message: 'Промокод успешно изменён',
        ok: true,
        sucses: true
      }
    } catch(e) {
      return {
        error: e,
        message: 'Неожиданная ошибка сервера'
      }
    }
  }

  async usePromo(id) {
    try {
      const promo = await this.discountReposity.findOne({ where: { id } })
      if(!promo) return {
        message: 'Не удалось найти промокод'
      }

      this.discountReposity.update({ usage: promo.usage - 1 }, { where: { id } })


      return {
        message: 'Промокод успешно использован',
        ok: true,
        sucses: true,
        usage: promo.usage - 1
      }
    } catch(e) {
      return {
        error: e,
        message: 'Неожиданная ошибка сервера'
      }
    }
  }

  async deletePromo(id) {
    try {
      if(!Number(id)) return {
        message: 'ID должен быть числом',
        ok: false,
        sucses: false
      }

      const deleted = await this.discountReposity.destroy({ where: { id } })

      return {
        ok: true,
        sucses: true,
        message: 'Промокод успешно удалён',
        deleted
      }
    } catch(e) {
      return {
        error: e,
        message: 'Неожиданная ошибка сервера'
      }
    }
  }

  async getAllPromo(limit = 10, offset = 0) {
    try {
      const promos = await this.discountReposity.findAll({
        limit, offset,
        order: [['id', 'ASC'] ],
      })

      return {
        promos,
        message: 'Промокоды успешно найдены',
        ok: true,
        sucses: true
      }
    } catch(e) {
      return {
        error: e,
        message: 'Неожиданная ошибка сервера'
      }
    }
  }
}
