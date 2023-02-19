import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export class Learn extends Model {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({ example: 'Обучающий курс', description: 'Название курса' })
  @Column({ type: DataType.STRING, unique: true })
  name: string

  @ApiProperty({ example: 'Описание курса', description: 'Описание курса' })
  @Column({ type: DataType.TEXT })
  description: string

  @ApiProperty({ example: 24000, description: 'Базовая цена курса' })
  @Column({ type: DataType.INTEGER })
  basePrice: number

  @ApiProperty({ example: 25, description: 'Процент скидки на курс' })
  @Column({ type: DataType.FLOAT })
  discount: number

  @ApiProperty({ example: 999, description: 'Колличество продаж курса' })
  @Column({ type: DataType.INTEGER })
  sold: number

  @ApiProperty({ example: 'Obuchaucshiy-curs', description: 'Ссылка на курс' })
  @Column({ type: DataType.STRING })
  href: string
}
