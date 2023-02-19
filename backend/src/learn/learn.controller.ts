import { LearnService } from './learn.service';
import { Body, Controller, Param, Post, Res, Headers, Get, Query, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createLearnDto } from './dto/learn-create.dto';
import { Learn } from './learn.model';

@ApiTags('Курсы')
@Controller('learn')
export class LearnController {
  constructor(
    private learnService: LearnService
  ) {}

  @ApiOperation({ summary: 'Создание курса' })
  @ApiResponse({ status: 200, type: Learn })
  @Post('/create-course')
  async create(@Body() productDto: createLearnDto, @Param() id, @Headers() headers, @Res() res) {
    return this.learnService.createLearn(productDto, headers, res)
  }

  @ApiOperation({ summary: 'Получить сведения о курсе' })
  @ApiResponse({ status: 200, type: Learn })
  @Get('/get-course/:id')
  async getOne(@Param() params, @Res() res) {
    return this.learnService.getCourse(params.href, res)
  }

  @ApiOperation({ summary: 'Получить сведения о курсах' })
  @ApiResponse({ status: 200, type: Learn })
  @Get('/get-courses')
  async getMany(@Param() params, @Res() res) {
    return this.learnService.getCourses(res)
  }

  @ApiOperation({ summary: 'Удалить курс' })
  @Delete('/delete-couse/:id')
  async delete(@Param() params, @Headers() headers, @Res() res) {
    return this.learnService.deleteCourse(params.id, headers, res)
  }
}
