import { Controller, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReadTrackingRoutes } from 'libs/read-tracking/constants';
import { BooksReadTrackingService } from 'libs/read-tracking/services';
import * as guards from 'libs/auth/guards';
import { CustomRequest } from 'libs/auth/types';
import {
  FindLastReadPageCredentials,
  ReadTrackCredentialsDto,
} from 'libs/read-tracking/dtos';
import { ReadTrackService } from 'libs/read-tracking/services/read-track.service';

@Controller(ReadTrackingRoutes.CONTROLLER)
@ApiTags(ReadTrackingRoutes.CONTROLLER)
@ApiBearerAuth()
export class ReadTrackingController {
  constructor(private readonly readTrackingService: ReadTrackService) {}

  @Post(`${ReadTrackingRoutes.BOOK}/${ReadTrackingRoutes.PAGE}`)
  @HttpCode(201)
  @UseGuards(guards.AccessTokenGuard)
  public trackRead(
    @Param() param: ReadTrackCredentialsDto,
    @Req() request: CustomRequest,
  ) {
    return this.readTrackingService.trackRead(param, request.user);
  }

  @Get(`${ReadTrackingRoutes.BOOK}/${ReadTrackingRoutes.LAST_READ_PAGE}`)
  @HttpCode(200)
  @UseGuards(guards.AccessTokenGuard)
  public findLastReadPage(
    @Param() param: FindLastReadPageCredentials,
    @Req() request: CustomRequest,
  ) {
    return this.readTrackingService.findLastReadPage(param, request.user);
  }
}
