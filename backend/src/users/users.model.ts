import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model } from "sequelize-typescript";
import { Product } from "src/product/product.model";


@Table
export class User extends Model {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({ example: 'Неиродиалог', description: 'Имя торгового представителя' })
  @Column({ type: DataType.STRING, unique: false })
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
  @Column({ type: DataType.INTEGER })
  legalProduct: number

  @ApiProperty({example: [1, 2, 3], description: 'Список товаров в корзине пользователя'})
  @Column({ type: DataType.ARRAY(DataType.INTEGER) })
  cart: [number]

  @ApiProperty({example: false, description: 'Показатель того, забанен ли пользователь'})
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean
}

// User.sync({alter: true})
