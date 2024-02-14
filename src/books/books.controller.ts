import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BooksRoutes } from 'libs/books/constants';
import * as guards from 'libs/auth/guards';
import { CustomRequest } from 'libs/auth/types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateBookCredentialsDto,
  DeleteBookCredentialsDto,
  FindBookCredentialsDto,
  FindBooksCredentialsDto,
  UpdateBookCredentialsDto,
} from 'libs/books/dtos';
import { BooksService } from 'libs/books';

@Controller(BooksRoutes.CONTROLLER)
@ApiTags(BooksRoutes.CONTROLLER)
@ApiBearerAuth()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get(BooksRoutes.FIND_BOOK)
  @HttpCode(200)
  @UseGuards(guards.AccessTokenGuard)
  public findBook(@Param() param: FindBookCredentialsDto) {
    return this.booksService.findBookById(param.id);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(guards.AccessTokenGuard)
  public fetchBooks(@Query() query: FindBooksCredentialsDto) {
    return this.booksService.findBooks(query);
  }

  @Post(BooksRoutes.CREATE)
  @HttpCode(201)
  @UseGuards(guards.AccessTokenGuard)
  public createBook(
    @Body() credentials: CreateBookCredentialsDto,
    @Req() request: CustomRequest,
  ) {
    return this.booksService.createBook(credentials, request.user);
  }

  @Patch(BooksRoutes.UPDATE_BOOK)
  @HttpCode(200)
  @UseGuards(guards.AccessTokenGuard)
  public updateBook(
    @Body() credentials: UpdateBookCredentialsDto,
    @Req() request: CustomRequest,
  ) {
    return this.booksService.updateBookDetails(credentials, request.user);
  }

  @Delete(BooksRoutes.DELETE_BOOK)
  @HttpCode(200)
  @UseGuards(guards.AccessTokenGuard)
  public async deleteBook(
    @Param() param: DeleteBookCredentialsDto,
    @Req() request: CustomRequest,
  ) {
    return this.booksService.deleteBook(param.id, request.user);
  }
}
