import { UsersService } from './users.service';
import { Body, Controller, Post, Headers, Get, Query, Param, Res, Delete  } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Permissions } from 'src/permissions/permissions.decorator';

class TokenResponse {
  @ApiProperty({ example: 'Матвей', description: 'Имя пользователя' })
  name: string

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsIm5hbWUiOiLQnNCw0YLQstC10LkiLCJwZXJtaXNzb25zIjpbInVzZXJQZXJtaXNzaW9ucyJdLCJlbWFpbCI6Im1hdHZleTExQGluYm94LnJ1IiwiaWF0IjoxNjYzNTk2MjEyLCJleHAiOjE2NjM1OTY1MTJ9.BdT4FYbWqyqq8w4ZisbQNeKgAkSmUt_4vo29eiay_mE', description: 'Токен пользователя' })
  token: string
}

class classValidator {
  @ApiProperty({ example: 400, description: 'Статус ответа' })
  statusCode: number

  @ApiProperty({ example: [
    "Пароль должен содержать от 6 до 50 символов"
  ], description: 'Сообщение с описание проблемы' })
  message: [string]
  
  @ApiProperty({ example: "Bad Request", description: 'Статус ответа' })
  error: string
}

class ValidationError {
  @ApiProperty({ example: "Старайтесь избегать в пароле сочитания цифр от 1 до 9 и буквенно-строчные сочитания (например, qwerty). Так злоумышленник сможет легко Вас взломать", description: 'Описание ошибки валидации' })
  message: string

  @ApiProperty({ example: "Измените пароль", description: 'Совет по исправлению ошибки валидации' })
  error: string

  @ApiProperty({ example: "password", description: 'Поле, в котором наблюдается ошибка валидации' })
  field: string
}

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @Post('/sing-up')
  async singup(@Body() dto: createUserDto) {
    return this.usersService.singup(dto)
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @Post('/sing-in')
  async singin(@Body() dto: LoginDto, @Res() res) {
    return this.usersService.singin(dto, res)
  }

  @ApiOperation({ summary: 'Изменения дыннх пользователя' })
  @ApiParam({ name: 'permissions', type: [String] })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'name', type: String })
  @ApiParam({ name: 'email', type: String })
  @ApiResponse({ status: 200, type: User })
  @Post('/update')
  async update(@Body() body, @Res() res, @Headers() headers) {
    const user = {
      name: body.name,
      id: body.id,
      email: body.email,
      permissions: body.permissions,
      banned: body.banned
    }
    
    return this.usersService.updateUser(headers, res, user)
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiParam({ name: 'id', type: Number })
  @Delete('/delete/:id')
  async delete(@Res() res, @Headers() headers, @Param() { id }) {
    return this.usersService.deleteUsers(headers, res, id)
  }

  @ApiOperation({ summary: 'Изменение пароля' })
  @Post('/change-password')
  async changePassword(@Body() body, @Headers() headers) {
    return this.usersService.changePassword(body.password, body.newPassword, headers)
  }

  @ApiOperation({ summary: 'Забыли пароль' })
  @Post('/forgot-password')
  async forgotPassword(@Body() body) {
    return this.usersService.forgotPassword(body.email)
  }

  @ApiOperation({ summary: 'Получить пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/get-users')
  async getUsers(@Query() params, @Headers() headers, @Res() res) {
    return this.usersService.getUsers(params, headers, res)
  }

  @ApiOperation({ summary: 'Получить данные пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Get('/get-user/:id')
  async getUser(@Param() { id }, @Headers() headers, @Res() res) {
    return this.usersService.getOne(id, headers ,res)
  }

  @ApiOperation({ summary: 'Установить разрешения' })
  @ApiParam({ name: 'permissions', type: [String] })
  @ApiParam({ name: 'id', type: Number })
  @Post('/set-permissions')
  async setPerrmissions(@Body() { permissions, id }) {
    return this.usersService.setPerrmissions(permissions, id)
  }

  @ApiOperation({ summary: 'Получить данные пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Get('/get-permissions/:id')
  async getPermissions(@Param() { id }) {
    return this.usersService.getPerrmissions(id)
  }

  @ApiOperation({ summary: 'Проверка токена на валидность и срок действия' })
  @ApiResponse({ status: 200, type: User })
  @Post('/check-token')
  async checkToken(@Body() { token }) {
    return this.usersService.checkToken(token)
  }
}
