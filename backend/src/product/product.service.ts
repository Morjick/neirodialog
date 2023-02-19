import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import createHref from 'src/vendor/createHref';
import findPermissions from 'src/vendor/findPermission';
import { createProductDto } from './dto/createProductDto.dto';
import { Product } from './product.model';


@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productReposity: typeof Product,
    @InjectModel(User) private userRepository: typeof User,
    private jwt: JwtService,
    private userService: UsersService
  ) {}

  async create(dto: createProductDto, { authorization }, res) {
    try {
      if(!authorization) return {
        message: 'Не удалось пройти авторизацию',
        ok: false
      }
      const token = authorization.split(' ')[1]
      const verify = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET_KEY
      })

      if(verify.permissons && Array.isArray(verify.permissons)) {
        const permisson = verify.permissons.find(el => el == 'createProducts')

        if(!permisson) return res.status(301).json({
          message: 'У вас нет доступа к созданию продукта',
          ok: false,
          sucses: false,
          status: 301
        })
      } else {
        return res.status(301).json({
          message: 'У вас нет доступа к созданию продукта',
          ok: false,
          sucses: false,
          status: 301
        })
      }


      const href = await createHref(dto.productName)

      const disc = Math.ceil(dto.fixPrice - (dto.fixPrice * dto.discount / 100)) 
      const product = await this.productReposity.create({ ...dto, price: disc, href, rating: 0, ratingCount: 0, name: dto.productName })

      return res.status(204).json({
        product,
        message: 'Продукт создан',
        ok: true,
        status: 204
      })
    } catch(e) {
      console.warn(e)
      return e
    }
  }

  async update(dto: createProductDto, { id }, { authorization }, res) {
    try {
      const isPermissions = await findPermissions(authorization, 'readUsers', this.jwt)

      if(!isPermissions.ok) return res.status(isPermissions.status || 501).json({
        message: isPermissions.message,
        status: isPermissions.status,
        ok: false
      })

      const href = await createHref(dto.productName)
      const disc = dto.fixPrice - (dto.fixPrice * dto.discount / 100)

      const product = await this.productReposity.update({ ...dto, price: disc, href }, { where: { id } })

      return res.status(204).json({
        product,
        message: 'Продукт успешно создан',
        href
      })
    } catch(e) {
      console.warn(e)
      return res.status(501).json({
        message: 'Неожиданная ошибка сервиса, пожалуйста, попробуйте ещё раз позже',
        status: 501,
        ok: false
      })
    }
  }

  async delete({id}, res, { authorization }) {
    try {
      const isPermission = await findPermissions(authorization, 'deleteProducts', this.jwt)

      if(!isPermission.ok) return res.status(isPermission.status || 501).json({
        message: isPermission.message,
        status: isPermission.status,
        ok: false
      })

      const product = await this.productReposity.findOne({ where: { id } })
      const deleted = await this.productReposity.destroy({ where: { id } })

      return res.status(200).json({
        product,
        deleted,
        message: 'Продукт был удалён',
        ok: true
      })
    } catch(e) {
      console.warn(e)
      return e
    }
  }

  async getOne({id}) {
    try {
      const product = await this.productReposity.findOne({ where: {id} })

      return product
    } catch(e) {
      console.warn(e)
      return e
    }
  }

  async getMany(param, { authorization }) {
    try {
      const { limit = 50, offset = 0, sort = 'minPrice', adminPage = false, name = '' } = param
      let show = true

      if(!authorization && adminPage) return {
        message: 'Не удалось пройти авторизацию',
        ok: false,
        status: 401
      }

      if(authorization) {
        const token = authorization.split(' ')[1]

        const verify = await this.jwt.verify(token, {
          secret: process.env.JWT_SECRET_KEY
        })

        if(verify.id && adminPage) {
          show = false
        }
      }

      let products = []

      if(show) {
        products = await this.productReposity.findAll({
          limit, offset,
          where: { 
            show,
            name: {
              [Op.like]: `%${name}%`
            } 
          },
          order: sort == 'minPrice' ? [['price', 'ASC'] ] : [['price', 'DESC']],
        })
      } else {
        products = await this.productReposity.findAll({
          limit, offset,
          order: sort == 'minPrice' ? [['price', 'ASC'] ] : [['price', 'DESC']],
        })
      }     

      const count = await this.productReposity.count({ where: { show: true } })
      const pages = count / limit > 1 ? Math.ceil(count) / limit : 1
      const nextPageAvaible = pages > 1 ? true : false

      return products
    } catch(e) {
      console.warn(e)
      return e
    }
  }

  async estimate(body) {
    try {
      const product = await this.getOne(body)

      const count = Number(product.dataValues.ratingCount) || 0
      const rating = product.dataValues.rating + body.rating

      const newRating = rating / (count + 1)

      const updateProduct = this.productReposity.update({ rating: newRating }, { where: { id: body.id } })

      return updateProduct
    } catch(e) {
      console.warn(e)
      return e
    }
  }

  async addItemCart(item, { authorization }) {
    try {
      if(!authorization) return {
        message: 'Не удалось пройти авторизацию',
        ok: false
      }
      const token = authorization.split(' ')[1]
      const verify = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET_KEY
      })

      if(!item) return {
        message: 'Укажите продукт для добавления в корзину',
        ok: false
      }

      const basket = await this.userService.getUserKey(verify.id, 'cart')
      const newBasket = []
      
      
      if(!basket || !basket.length) {
        newBasket.push(item)
        newBasket.filter(el => {
          if(el && el !== null) return el
        })

        await this.userRepository.update({ cart: newBasket }, { where: { id: verify.id } })
      } else {
        basket.push(item)
        basket.filter(el => {
          if(el && el !== null) return el
        })

        await this.userRepository.update({ cart: basket }, { where: { id: verify.id } })
      }
      
      return basket
    } catch(e) {
      return {
        message: 'Неожиданная ошибка сервера',
        error: e,
        ok: false
      }
    }
  }

  async setDaysProduct({ id }) {
    try {
      const candidate = await this.productReposity.findOne({ where: { id } })
      if(!candidate) {
        return {
          message: 'Не удалолсь найти продукт',
          ok: false,
          status: 500
        }
      }

      await this.productReposity.update({ daysProduct: false }, { where: { daysProduct: true } })

      const daysProduct = await this.productReposity.update({ daysProduct: true }, { where: { id } })

      const product = await this.productReposity.findOne({ where: { id } })

      return product
    } catch(e) {
      console.warn(e)
      return e
    }
  }

  async getDaysProduct() {
    try {
      const product = await this.productReposity.findOne({ where: { daysProduct: true } })
      if(!product) {
        return {
          message: 'Не удалолсь найти продукт',
          ok: false,
          status: 500
        }
      }

      return product
    } catch(e) {
      console.warn(e)
      return e
    }
  }
}
