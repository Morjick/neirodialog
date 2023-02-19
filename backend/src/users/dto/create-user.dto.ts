import { ApiProperty } from "@nestjs/swagger"
import {IsEmail, IsNumber, IsString, Length} from "class-validator"

export class createUserDto {
  @ApiProperty({ example: 'Набор для пальчиков', description: 'Email пользователя' })
  @IsString({message: 'Email должен быть строкой'})
  @IsEmail({}, {message: 'Введите корректный email'})
  readonly email: string

  @ApiProperty({ example: 'Матвей', description: 'Имя пользователя' })
  @IsString({message: 'Имя должно быть строкой'})
  readonly name: string

  @ApiProperty({example: '123456qwerty', description: 'Пароль пользователя'})
  @IsString({message: 'Пароль должен быть строкой'})
  @Length(6, 50, { message: 'Пароль должен содержать от 6 до 50 символов'})
  readonly password: string
  
  readonly basket: [object]
  readonly notifications: [object]
}