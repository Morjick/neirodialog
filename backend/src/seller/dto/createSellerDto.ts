import {ApiProperty} from "@nestjs/swagger"
import {IsEmail, IsNumber, IsString, Length} from "class-validator"

export class createSellerDto {
  @ApiProperty({ example: 'Неиродиалог', description: 'Имя торгового представителя' })
  @IsString({ message: 'Имя торгового представителя должно быть строкой' })
  readonly name: string

  @ApiProperty({ example: 'neirodialog@mail.ru', description: 'Email торгового представителя' })
  @IsEmail({}, {message: 'Введите корректный email'})
  @IsString({ message: 'Email должен быть строкой'})
  readonly email: string
  
  @ApiProperty({ example: '123456qwerty', description: 'Пароль торгового представителя'})
  @IsString({ message: 'Пароль должен быть строкой'})
  readonly password: string

  @ApiProperty({ example: 5, description: 'Колличество товаров, которые может иметь торговый представитель'})
  @IsNumber({}, {message: 'Число разрешённых товаров должно быть числом'})
  readonly legalProduct: number
}