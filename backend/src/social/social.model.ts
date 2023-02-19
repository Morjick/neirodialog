import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export class Social extends Model {
  
  @ApiProperty({ example: 'neirodialog', description: 'Имя сайта' })
  @Column({type: DataType.STRING, unique: true})
  name: string

  @ApiProperty({ example: '8-800-555-35-35', description: 'Номер телефона администрации сайта' })
  @Column({type: DataType.STRING})
  phone: string

  @ApiProperty({ example: 'neirodialog@mail.ru', description: 'Email сайта' })
  @Column({type: DataType.STRING})
  email: string
  
  @ApiProperty({ example: 'https://instagramm/neirodialog/', description: 'Ссылка на Instagramm сайта' })
  @Column({type: DataType.STRING})
  instagramm: string

  @ApiProperty({ example: 'https://vk/neirodialog/', description: 'Ссылка на VK сайта' })
  @Column({type: DataType.STRING})
  vk: string

  @ApiProperty({ example: 'https://youtube/neirodialog/', description: 'Ссылка на YouTube сайта' })
  @Column({type: DataType.STRING})
  youtube: string
}
