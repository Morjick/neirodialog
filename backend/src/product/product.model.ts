import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export class Product extends Model {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({ example: 'Набор для пальчиков', description: 'Имя товара' })
  @Column({ type: DataType.STRING, unique: true })
  name: string

  @ApiProperty({ example: 'nabor-dly-palchikov', description: 'Ссылка на товар' })
  @Column({ type: DataType.STRING, unique: true })
  href: string

  @ApiProperty({ example: 'Неиродиалог', description: 'Имя продавца товара' })
  @Column({ type: DataType.STRING })
  sellerName: string

  @ApiProperty({ example: 12990, description: 'Итоговая цена продукта (с учётом скидки)' })
  @Column({ type: DataType.INTEGER })
  price: number

  @ApiProperty({ example: 20, description: 'Скидка на товар (в процентах)' })
  @Column({ type: DataType.INTEGER })
  discount: number

  @ApiProperty({ example: 12990, description: 'Фиксированная цена продукта без учёта скидок и акций' })
  @Column({ type: DataType.INTEGER })
  fixPrice: number

  @ApiProperty({ example: '1239891273.aywgdbahkwdnsjdh.jpg', description: 'Имя главного изображения продукта' })
  @Column({ type: DataType.STRING })
  avatar: string

  @ApiProperty({ example: ['1239891273.aywgdbahkwdnsjdh.jpg', '1239891273.aywgdbahkwdnsjdh.jpg', '1239891273.aywgdbahkwdnsjdh.jpg'], description: 'Имя изображений продукта' })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  photos: [string]

  @ApiProperty({ example: ['1239891273.aywgdbahkwdnsjdh.mp4', '1239891273.aywgdbahkwdnsjdh.mp4', '1239891273.aywgdbahkwdnsjdh.mp4'], description: 'Имя видео продукта' })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  video: [string]

  @ApiProperty({ example: true, description: 'Показатель отображение товара на сайте' })
  @Column({ type: DataType.BOOLEAN })
  show: boolean

  @ApiProperty({ example: true, description: 'Показатель отображение товара на главной странице' })
  @Column({ type: DataType.BOOLEAN })
  inMainPage: boolean

  @ApiProperty({ example: 4.9, description: 'Рейтинг товара' })
  @Column({ type: DataType.INTEGER })
  rating: number

  @ApiProperty({ example: 492, description: 'Колличество оценок' })
  @Column({ type: DataType.STRING })
  ratingCount: number

  @ApiProperty({ example: 'Физический товар', description: 'Тип товара' })
  @Column({ type: DataType.STRING })
  type: string

  @ApiProperty({ example: true, description: 'Показатель наличия товара на данных момент' })
  @Column({ type: DataType.BOOLEAN })
  inStock: boolean

  @ApiProperty({ example: 459, description: 'Показатель колличества товара в наличии' })
  @Column({ type: DataType.INTEGER })
  stock: number

  @ApiProperty({ example: 'ATR-399V', description: 'Артикул товара' })
  @Column({ type: DataType.STRING })
  articule: string

  @ApiProperty({ example: '#000', description: 'Цвет товара' })
  @Column({ type: DataType.STRING })
  color: string

  @ApiProperty({ example: true, description: 'Является ли товар "Товаром дня"' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  daysProduct: boolean

  @ApiProperty({ example: 'Очень крутой товар', description: 'Описание товара' })
  @Column({ type: DataType.TEXT })
  description: string
}
