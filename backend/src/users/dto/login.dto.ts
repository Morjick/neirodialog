import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";


export class LoginDto {
  @ApiProperty({example: 'matvey@mail.ru', description: 'Email пользователя'})
  @IsString({message: 'Email должен быть строкой'})
  @IsEmail({}, {message: 'Введите корректный email'})
  readonly email: string

  @ApiProperty({example: '123456qwerty', description: 'Пароль пользователя'})
  @IsString({message: 'Пароль должен быть строкой'})
  readonly password: string
}