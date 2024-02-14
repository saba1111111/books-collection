import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { UsersModule } from 'libs/users';
import { BooksLibModule } from 'libs/books';

@Module({
  imports: [BooksLibModule, UsersModule],
  controllers: [BooksController],
})
export class BooksModule {}
