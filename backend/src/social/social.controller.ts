import { createSocialDto } from './dto/create-social.dto';
import { SocialService } from './social.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Social } from './social.model';

@ApiTags('Информация для сайта')
@Controller('social')
export class SocialController {
  constructor(private socialService: SocialService) {}

  @ApiOperation({ summary: 'Получение данных приложения' })
  @ApiResponse({ status: 200, type: Social })
  @Get('/get-social')
  getSocial() {
    return this.socialService.getSocial()
  }

  @ApiOperation({ summary: 'Изменение данных приложения' })
  @ApiResponse({ status: 200, type: Social })
  @Post('/update-social')
  @ApiParam({ name: 'name', type: String })
  @ApiParam({ name: 'email', type: String })
  @ApiParam({ name: 'phone', type: String })
  @ApiParam({ name: 'vk', type: String })
  @ApiParam({ name: 'instagramm', type: String })
  @ApiParam({ name: 'youtube', type: String })
  updateSocial(@Body() body: createSocialDto) {
    return this.socialService.updateSocial(body)
  }
}
