import {ApiProperty} from "@nestjs/swagger"
import {IsEmail, IsNumber, IsString, Length} from "class-validator"

export class createLearnDto {
  @ApiProperty({ example: 'Курс по маникюру', description: 'Название курса' })
  @Length(5, 200, {message: 'Название должно иметь минимум 5 символов без спецсимволов, а максимум 200'})
  @IsString({message: 'Название должно быть строкой'})
  readonly name: string

  @ApiProperty({ example: 25499, description: 'Базовая цена продукта' })
  @IsNumber({}, {message: 'Цена должна быть числом'})
  readonly price: number

  @ApiProperty({ example: 'Описание курса', description: 'Описание курса' })
  @Length(5, 2000, {message: 'Название должно иметь минимум 5 символов без спецсимволов, а максимум 200'})
  readonly description: string

  @ApiProperty({ example: 25, description: 'Процент скидки на курс' })
  readonly discount: number

  @ApiProperty({ example: ['https://aaaa.mp4'], description: 'Ссылки на видео' })
  readonly videos?: string[]
}