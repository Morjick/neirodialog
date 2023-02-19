import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import createHref from 'src/vendor/createHref';
import { createLearnDto } from './dto/learn-create.dto';
import { Learn } from './learn.model';

@Injectable()
export class LearnService {
  constructor(
    @InjectModel(Learn) private learnReposity: typeof Learn,
    private jwt: JwtService,
  ) { }

  async createLearn(dto: createLearnDto, { authorization }, res) {
    try {
      if (!authorization) return res.status(301).json({
        ok: false,
        message: 'Не удалось пройти авторизацию'
      })

      const token = authorization.split(' ')[1]
      const verify = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET_KEY
      })

      if (verify.permissons && Array.isArray(verify.permissons)) {
        const permisson = verify.permissons.find(el => el == 'createLearn')

        if (!permisson) return res.status(301).json({
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

      const href = await createHref(dto.name)

      const learn = await this.learnReposity.create({ ...dto, href })

      return res.status(201).json({
        message: 'Курс создан',
        ok: true,
        learn,
        status: 200
      })
    } catch (e) {
      return res.status(501).json({
        message: 'Неожиданная ошибка сервиса, пожалуйста, попробуйте ещё раз позже',
        status: 501,
        ok: false
      })
    }
  }

  async addVideo (video, res) {
    try {

    } catch(e) {
      return res.status(501).json({
        message: 'Неожиданная ошибка сервиса, пожалуйста, попробуйте ещё раз позже',
        status: 501,
        ok: false
      })
    }
  }

  async getCourse(href, res) {
    try {
      const course = await this.learnReposity.findOne({ where: { href } })

      return res.status(200).json({
        message: 'Курс создан',
        status: 200,
        ok: true,
        course: {
          ...course,
          price: course.basePrice * course.discount / 100
        }
      })
    } catch (e) {
      return res.status(501).json({
        message: 'Не получилось найти курс',
        status: 501,
        ok: false,
        error: e
      })
    }
  }

  async getCourses(res) {
    try {
      const courses = await this.learnReposity.findAll()

      const returnedCourses = courses.map((el: Learn) => {
        return {
          ...el,
          price: el.basePrice * el.discount / 100
        }
      })

      return res.status(200).json({
        message: 'Курсы найдены',
        status: 200,
        ok: true,
        curses: returnedCourses
      })
    } catch (e) {
      return res.status(501).json({
        message: 'Не получилось найти курсs',
        status: 501,
        ok: false,
        error: e
      })
    }
  }

  async deleteCourse(id, { authorization }, res) {
    try {
      if (!authorization) return res.status(301).json({
        ok: false,
        message: 'Не удалось пройти авторизацию'
      })

      const token = authorization.split(' ')[1]
      const verify = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET_KEY
      })

      if (verify.permissons && Array.isArray(verify.permissons)) {
        const permisson = verify.permissons.find(el => el == 'deleteLearn')

        if (!permisson) return res.status(301).json({
          message: 'У вас нет доступа для удаления продукта',
          ok: false,
          sucses: false,
          status: 301
        })
      } else {
        return res.status(301).json({
          message: 'У вас нет доступа для удаления продукта',
          ok: false,
          sucses: false,
          status: 301
        })
      }

      await this.learnReposity.destroy({ where: { id } })

      return res.status(202).json({
        message: 'Курс удалён',
        ok: true,
        status: 202
      })
    } catch (e) {
      return res.status(501).json({
        message: 'Не получилось найти курсs',
        status: 501,
        ok: false,
        error: e
      })
    }
  }
}
