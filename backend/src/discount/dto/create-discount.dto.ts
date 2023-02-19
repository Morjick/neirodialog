import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, Length } from "class-validator"


export class createDiscountDto {
  @ApiProperty({ example: 'Универсальная скидка', description: 'Имя товара' })
  @Length(5, 200, {message: 'Имя промокода должно иметь минимум 5 символов без спецсимволов, а максимум 200'})
  @IsString({message: 'Имя промокода должно быть строкой'})
  readonly name: string

  // @ApiProperty({ example: 'Неиродиалог', description: 'Имя автора' })
  // @IsString({message: 'Имя автора должно быть строкой'})
  // readonly autor: string

  @ApiProperty({ example: 20, description: 'Процент скидки' })
  @IsNumber({}, { message: 'Процент должен быть числом' })
  readonly percent: number

  @ApiProperty({ example: 400, description: 'Колличество использований' })
  @IsNumber({}, { message: 'Колличество использований должнo быть числом' })
  readonly usage: number
}