import { ApiProperty } from "@nestjs/swagger";
import { Model } from "sequelize";
import { Column, DataType, HasMany, Table } from "sequelize-typescript";
import { Product } from "src/product/product.model";


@Table
export class Seller extends Model {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({ example: 'Неиродиалог', description: 'Имя торгового представителя' })
  @Column({ type: DataType.STRING, unique: true })
  name: string

  @ApiProperty({ example: 'matvey@mail.ru', description: 'Email торгового представителя' })
  @Column({ type: DataType.STRING, unique: true })
  email: string

  @ApiProperty({ example: '123456qwerty', description: 'Пароль торгового представителя' })
  @Column({ type: DataType.STRING })
  password: string

  @ApiProperty({ example: ['createProducts', 'readProducts', 'loginToAdmin', 'createDiscount', 'createPromo'], description: 'Права торгового представителя' })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  permissins: [string]

  @ApiProperty({ example: 200, description: 'Максимальное число товаров торгового представителя' })
  @Column({ type: DataType.NUMBER })
  legalProduct: number | null

  @ApiProperty({ example: [1, 2, 3], description: 'Товары торгового представителя' })
  @HasMany(() => Product)
  products: [string]
}