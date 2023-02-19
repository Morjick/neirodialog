import { Controller, Get, Res, Response } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'

@ApiTags('Swagger')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Запрос на главный роут API' })
  @Get()
  getHello(@Res() res): string {
    return res.status(200).redirect('/swagger')
  }
}
