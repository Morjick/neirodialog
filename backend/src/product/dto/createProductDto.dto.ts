import {ApiProperty} from "@nestjs/swagger"
import {IsEmail, IsNumber, IsString, Length} from "class-validator"

export class createProductDto {
  @ApiProperty({ example: 'Набор для пальчиков', description: 'Имя товара' })
  @Length(5, 200, {message: 'Имя должно иметь минимум 5 символов без спецсимволов, а максимум 200'})
  @IsString({message: 'Имя должно быть строкой'})
  readonly productName: string

  // @ApiProperty({ example: 'Неиродиалог', description: 'Имя торгового представителя' })
  // @IsString({message: 'Имя торгового представителя должно быть строкой'})
  // readonly sellerName: string

  @ApiProperty({ example: 20, description: 'Скидка на товар (в процентах)' })
  @IsNumber({}, {message: 'Скидка должна быть числом'})
  readonly discount: number

  @ApiProperty({ example: 12990, description: 'Фиксированная цена продукта без учёта скидок и акций' })
  @IsNumber({}, {message: 'Цена должна быть числом'})
  readonly fixPrice: number

  // @ApiProperty({ example: '1239891273.aywgdbahkwdnsjdh.jpg', description: 'Имя главного изображения продукта' })
  // readonly avatar: string

  @ApiProperty({ example: ['1239891273.aywgdbahkwdnsjdh.jpg', '1239891273.aywgdbahkwdnsjdh.jpg', '1239891273.aywgdbahkwdnsjdh.jpg'], description: 'Имя изображений продукта' })
  readonly photos: [string]

  @ApiProperty({ example: ['1239891273.aywgdbahkwdnsjdh.mp4', '1239891273.aywgdbahkwdnsjdh.mp4', '1239891273.aywgdbahkwdnsjdh.mp4'], description: 'Имя видео продукта' })
  readonly video: [string]

  @ApiProperty({ example: true, description: 'Показатель отображение товара на сайте' })
  readonly show: boolean

  @ApiProperty({ example: true, description: 'Показатель отображение товара на главной странице' })
  readonly inMainPage: boolean

  @ApiProperty({ example: 'Физический товар', description: 'Тип товара' })
  readonly type: string

  @ApiProperty({ example: 459, description: 'Показатель колличества товара в наличии' })
  readonly stock: number

  @ApiProperty({ example: 'ATR-399V', description: 'Артикул товара' })
  readonly articule: string

  @ApiProperty({ example: '#000', description: 'Цвет товара' })
  readonly color: string

  @ApiProperty({ example: ['#000', '#fff', 'red', 'rgba(0, 0, 5, 255)'], description: 'Цвета товара' })
  readonly colors: [string]

  @ApiProperty({ example: 'Товар очень-очень клёвой, да ещё и стоит дёшево, надо брать', description: 'Описание товара' })
  readonly description: string
}