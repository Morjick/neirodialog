import { Body, Controller, Post, Headers, Param, Delete, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Discount } from './discount.model';
import { DiscountService } from './discount.service';
import { createDiscountDto } from './dto/create-discount.dto';

@ApiTags('Скидки')
@Controller('discount')
export class DiscountController {
  constructor(private discountService: DiscountService) {}

  @ApiOperation({ summary: 'Создание продукта' })
  @ApiResponse({ status: 200, type: Discount })
  @Post('/create-promo')
  async create(@Body() discountDto: createDiscountDto, @Headers() headers) {
    return this.discountService.createPromo(discountDto, headers)
  }

  @ApiOperation({ summary: 'Изменение продукта' })
  @ApiResponse({ status: 200, type: Discount })
  @Post('/update-promo')
  async update(@Body() discountDto: createDiscountDto, @Body() id) {
    return this.discountService.updatePromo(discountDto, id.id)
  }

  @ApiOperation({ summary: 'Удаление продукта' })
  @ApiResponse({ status: 200, type: Discount })
  @Delete('/delete-promo/:id')
  async deletePromo(@Param() { id }) {
    return this.discountService.deletePromo(id)
  }

  @ApiOperation({ summary: 'Получение промокодов' })
  @ApiResponse({ status: 200, type: [Discount] })
  @Get('/get-all')
  async getAll(@Query() { limit, offset }) {
    return this.discountService.getAllPromo(limit, offset)
  }
}
