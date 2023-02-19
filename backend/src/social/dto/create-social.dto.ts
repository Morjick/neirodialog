import { ApiParam, ApiProperty } from "@nestjs/swagger"
import {IsEmail, IsString, Length} from "class-validator"

export class createSocialDto {
  @ApiProperty({ example: 'neirodialog@mail.ru', description: 'Email для замены' })
  @IsString({message: 'Email должен быть строкой'})
  @IsEmail({}, {message: "Некорректный email"})
  readonly email: string

  @ApiProperty({ example: '88005553535', description: 'Номер телефона для замены' })
  @IsString({message: 'Номер телефона должен быть строкой'})
  @Length(10, 20, {message: 'Не меньше 4 и не больше 16'})
  readonly phone: string

  @ApiProperty({ example: 'Neirodialog', description: 'Имя сайта' })
  @IsString({message: 'Имя сайта должно быть строкой'})
  readonly name: string

  @ApiProperty({ example: 'https://instagramm/neirodialog/', description: 'Instagramm сайта' })
  @IsString({message: 'Instagramm должен быть строкой'})
  readonly instagramm: string

  @ApiProperty({ example: 'https://vk/neirodialog/', description: 'VK сайта' })
  @IsString({message: 'Имя сайта должно быть строкой'})
  readonly vk: string
  
  @ApiProperty({ example: 'https://youtube/neirodialog/', description: 'YouTube сайта' })
  @IsString({message: 'Имя сайта должно быть строкой'})
  readonly youtube: string
}
