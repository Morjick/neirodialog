import { HttpCode, HttpStatus, Injectable, Redirect, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import checkPassword from 'src/vendor/isNormalPassword';
import * as nodemailer from 'nodemailer'
import findPermissions from 'src/vendor/findPermission';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwt: JwtService
  ) {}

  async singup(dto: createUserDto) {
    try {
      const hashPassword = await bcrypt.hash(dto.password, 10)

      const candidate = await this.userRepository.findOne({where: { email: dto.email }})
      if(candidate) return {
        message: 'Пользователь с таким email уже существует!',
        email: 'password'
      }

      const isNormalPassword = await checkPassword(dto.password, dto.name)
      if(!isNormalPassword.normal) return {
        message: isNormalPassword.message,
        error: 'Измените пароль',
        field: 'password'
      }

      await this.userRepository.create({ ...dto, password: hashPassword, permissins: ['userPermissions'] })
      const user = await this.userRepository.findOne({where: { email: dto.email }})

      const token = this.jwt.sign({
        id: user.id,
        name: user.name,
        permissons: user.permissins,
        email: dto.email
      }, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '5d'
      })

      return {
        name: user.name,
        token
      }
    } catch(e) {
      return {
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 500
      }
    }
  }

  async singin(dto: LoginDto, res) {
    try {
      const email = dto.email
      const password = dto.password

      const condidate = await this.userRepository.findOne({ where: { email } })

      if(!condidate) return {
        message: 'Пользователь не найден',
        error: 404
      }

      const isPassword = await bcrypt.compare(password, condidate.password)
      
      if(!isPassword) return res.status(401).json({
        message: 'Неверный пароль',
        error: 401
      })

      const token = this.jwt.sign({
        id: condidate.id,
        name: condidate.name,
        permissons: condidate.permissins,
        email
      }, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '5d'
      })
      return res.status(200).json({
        token,
        name: condidate.name,
        permissons: condidate.permissins,
      })
    } catch(e) {
      return res.status(501).json({
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 501
      })
    }
  }

  async updateUser ({ authorization }, res, user) {
    try {
      const permissions = user.permissions
      const email = user.email
      const name = user.name
      const id = user.id
      const banned = user.banned

      const isPermissions = await findPermissions(authorization, 'updateUsers', this.jwt)

      if(!isPermissions.ok) return res.status(isPermissions.status || 501).json({
        message: isPermissions.message,
        status: isPermissions.status,
        ok: false
      })

      const data = await this.userRepository.update({ email, name, permissins: permissions, banned }, { where: { id } })

      return res.status(204).json({
        user: data,
        message: 'Данные пользователя обновлены',
        status: 204
      })
    } catch(e) {
      return res.status(501).json({
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 501
      })
    }
  }

  async deleteUsers ({ authorization }, res, id) {
    try {
      const isPermissions = await findPermissions(authorization, 'deleteUsers', this.jwt)

      if(!isPermissions.ok) return res.status(isPermissions.status || 501).json({
        message: isPermissions.message,
        status: isPermissions.status,
        ok: false
      })

      const deleted = this.userRepository.destroy({where: { id }})

      return res.status(204).json({
        deleted,
        message: 'Данные пользователя обновлены',
        status: 204
      })
    } catch(e) {
      return res.status(501).json({
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 501
      })
    }
  }

  async changePassword(password, newPassword, token) {
    try {
      if(!token || !token.authorization) return {
        message: 'Автоматически получить Ваш email не получилось, пожалуйста, введите его в ручную',
        field: 'email'
      }

      if(password == newPassword) return {
        message: 'Новый пароль должен отличаться от предыдущего',
        field: 'newPassword'
      }

      const verify = this.jwt.verify(token.authorization.split(' ')[1], {
        secret: process.env.JWT_SECRET_KEY
      })

      const user = await this.userRepository.findOne({ where: { id: verify.id } })

      const isPassword = await bcrypt.compare(password, user.password)
      console.log(isPassword)
      if(!isPassword) return {
        message: 'Неверный пароль',
        status: 401
      }

      const isNormalPassword = await checkPassword(password, verify.name)
      if(!isNormalPassword.normal) return {
        message: isNormalPassword.message,
        error: 'Измените пароль',
        field: 'password'
      }

      const hashPassword = await bcrypt.hash(newPassword, 10)

      await this.userRepository.update({ password: hashPassword }, { where: { id: verify.id } })

      const newToken = this.jwt.sign({
        id: verify.id,
        name: verify.name,
        permissons: verify.permissins,
        email: verify.email
      }, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '5d'
      })

      return {
        message: 'Пароль успешно изменён',
        token: newToken
      }
    } catch(e) {
      console.warn(e)
      return {
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 500
      }
    }
  }

  async forgotPassword(email) {
    try {
      const testEmailAccount  = nodemailer.createTestAccount()

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'matvey200171@gmail.com',
          pass: 'Vfndtq03042001!',
        },
      })

      const result = await transporter.sendMail({
        from: 'Neirodialog',
        to: 'matvey-khramov@inbox.ru, matvey200171@gmail.com',
        subject: 'На сайте neirodialog.ru пытаются восстановить Ваш пароль',
        text: 'TНа сайте neirodialog.ru пытаются восстановить Ваш пароль. Если это не вы, пожалуйста, не отвечайте на это сообщение. Если вам действительно требуется смена паорля, пожалуйста, подождите, пока мы придумаем, как это сделать.',
        html:
          'Это <span style="color: red;">сообщение</span> самоуничтожится через <span style="color: red;">30 секунд</span>',
      })

      return result

    } catch(e) {
      console.warn(e)
      return {
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 500
      }
    }
  }

  async getUsers({limit = 50, offset = 0}, { authorization }, res) {
    try {
      const isPermissions = await findPermissions(authorization, 'readUsers', this.jwt)

      if(!isPermissions.ok) return res.status(isPermissions.status || 501).json({
        message: isPermissions.message,
        status: isPermissions.status,
        ok: false
      })

      const users = await this.userRepository.findAll({
        limit, offset,
        attributes: ['email', 'name', 'permissins', 'legalProduct', 'cart', 'id'],
        order: [['id', 'ASC'] ]
      })

      return res.status(200).json({
        users,
        ok: true,
        status: 200,
        message: 'Пользователи найдены'
      })
    } catch(e) {
      return {
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 500
      }
    }
  }

  async getOne(id, { authorization }, res) {
    try {
      const isPermissions = await findPermissions(authorization, 'readUsers', this.jwt)

      if(!isPermissions.ok) return res.status(isPermissions.status || 501).json({
        message: isPermissions.message,
        status: isPermissions.status,
        ok: false
      })
      
      const isUpdateUser = await findPermissions(authorization, 'updateUsers', this.jwt)

      const user = await this.userRepository.findOne({ 
        where: { id },
        attributes: ['email', 'name', 'permissins', 'legalProduct', 'cart', 'id', 'cart', 'banned']
      })

      return res.status(200).json({
        user,
        message: 'Пользователь успешно найден',
        status: 200,
        updateUser: isUpdateUser ? true : false
      })
    } catch(e) {
      return {
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 500
      }
    }
  }

  async getUserKey(id, key) {
    try {
      const user = await this.userRepository.findOne({ where: { id } })

      return user[key]
    } catch(e) {
      return {
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 500
      }
    }
  }

  async setPerrmissions(permissions, id) {
    try {
      const user = await this.userRepository.update({ permissins: permissions }, { where: { id } })

      return user
    } catch(e) {
      return {
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 500
      }
    }
  }

  async getPerrmissions(id) {
    try {
      const user = await this.userRepository.findOne({ where: { id } })

      return {
        perrmissions: user.permissins
      }
    } catch(e) {
      return {
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 500
      }
    }
  }

  async checkToken (token) {
    try {
      const verify = await this.jwt.verify(token.split(' ')[1], {
        secret: process.env.JWT_SECRET_KEY
      })

      if(!(verify && verify.permissons)) return {
        message: 'Срок действия токена истёк, или токен авторизации не валиден',
        ok: false,
        status: 401
      }
      // if(!(verify && verify.permissons)) return res.status(401).redirect('/auth')

      return {
        message: 'Авторизация подтверждена',
        ok: true,
        status: 200,
        token
      }
    } catch(e) {
      return {
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 401,
        ok: false,
      }
    }
  }

  async getIsPermission ({ authorization }, res, permission: string) {
    try {
      const isPermissions = await findPermissions(authorization, permission, this.jwt)
      
      if(!isPermissions.ok) return res.status(isPermissions.status || 501).json({
        message: isPermissions.message,
        status: isPermissions.status,
        ok: false
      })
      console.log(isPermissions)

      return res.status(200).json({
        message: 'Доступ подтверждён',
        ok: true,
        status: 200
      })
    } catch(e) {
      return res.status(501).json({
        error: e,
        message: 'Неожиданная ошибка сервера',
        status: 401,
        ok: false,
      })
    }
  }
}
