import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Discount extends Model {
  @ApiProperty({ example: 'Универсальная скидка', description: 'Наименование скидки' })
  @Column({ type: DataType.STRING, unique: true })
  name: string

  @ApiProperty({ example: 'P0memo', description: 'Код промокода. Код активации' })
  @Column({ type: DataType.STRING, unique: true })
  promo: string

  @ApiProperty({ example: 'Неиродиалог', description: 'Автор, создавший акцию или промокод' })
  @Column({ type: DataType.STRING })
  autor: string

  @ApiProperty({ example: 20, description: 'Процент получаемой скидки' })
  @Column({ type: DataType.INTEGER })
  percent: number

  @ApiProperty({ example: 400, description: 'Колличество использований' })
  @Column({ type: DataType.INTEGER })
  usage: number

  @ApiProperty({ example: 5000, description: 'Минимальная сумма, при которой действует промокод' })
  @Column({ type: DataType.INTEGER })
  minSumm: number
}