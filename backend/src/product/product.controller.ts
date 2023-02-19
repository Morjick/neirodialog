import { ProductService } from './product.service';
import { Controller, Get, Post, Body, Param, Query, Delete, Headers, Res } from '@nestjs/common';
import { createProductDto } from './dto/createProductDto.dto'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './product.model';
import { UsersService } from '../users/users.service';

interface isPermissionI { message: string,  ok: boolean, status: number }

@ApiTags('Продукты')
@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private userService: UsersService
  ) {}

  @ApiOperation({ summary: 'Создание продукта' })
  @ApiResponse({ status: 200, type: Product })
  @ApiParam({ name: 'productName', type: String })
  @ApiParam({ name: 'sellerName', type: String })
  @ApiParam({ name: 'discount', type: Number })
  @ApiParam({ name: 'fixPrice', type: Number })
  @ApiParam({ name: 'show', type: Boolean })
  @ApiParam({ name: 'stock', type: Number })
  @ApiParam({ name: 'articule', type: String })
  @Post('/create-product')
  async create(@Body() productDto: createProductDto, @Headers() headers, @Res() res) {
    
    return this.productService.create(productDto, headers, res)
  }

  @ApiOperation({ summary: 'Изменение продукта' })
  @ApiResponse({ status: 200, type: Product })
  @Post('/update-product/:id')
  async update(@Body() productDto: createProductDto, @Param() id, @Headers() headers, @Res() res) {
    return this.productService.update(productDto, id, headers, res)
  }

  @ApiOperation({ summary: 'Получение продуктов' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get('/get-many')
  @ApiParam({ name: 'limit', type: Number, required: false })
  @ApiParam({ name: 'offset', type: Number, required: false })
  async getMany(@Query() param, @Headers() headers) {
    return this.productService.getMany(param, headers)
  }

  @ApiOperation({ summary: 'Получение товара' })
  @ApiResponse({ status: 200, type: Product })
  @Get('/get-one/:id')
  async getOne(@Param() param) {
    return this.productService.getOne(param)
  }

  @ApiOperation({ summary: 'Удаление товара' })
  @ApiResponse({ status: 200, type: Product })
  @Delete('/delete-product/:id')
  async deleteProduct(@Param() param, @Res() res, @Headers() headers) {
    return this.productService.delete(param, res, headers)
  }

  @ApiOperation({ summary: 'Оценить продукт' })
  @ApiResponse({ status: 200, type: Product })
  @Post('/estimate-product')
  async estimate(@Body() id) {
    if(!id.id) return {
      message: 'Укажите id'
    }
    return this.productService.estimate(id)
  }

  @ApiOperation({summary: 'Добавить товар в корзину'})
  @ApiResponse({ status: 200, type: Product })
  @Post('/add-item-cart')
  async addItemCart(@Body() body, @Headers() headers) {
    return this.productService.addItemCart(body.itemId, headers)
  }

  @ApiOperation({summary: 'Назначить товар дня'})
  @ApiResponse({ status: 200, type: Product })
  @Post('/set-days-product')
  async setDaysProduct(@Body() body) {
    return this.productService.setDaysProduct(body)
  }

  @ApiOperation({ summary: 'Получение товара' })
  @ApiResponse({ status: 200, type: Product })
  @Get('/get-days-product')
  async getDaysProduct() {
    return this.productService.getDaysProduct()
  }

  @ApiOperation({ summary: 'Подтверждение доступа' })
  @ApiParam({ name: 'permission', type: String })
  @Get('/get-permission/:permission')
  async getPermission(@Headers() headers, @Res() res, @Param() param) {
    return this.userService.getIsPermission(headers, res, param.permission)
  }
}
