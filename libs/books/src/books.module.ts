import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksEntity } from './entitites';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModuleProviders } from './providers';
import { PagesModule } from 'libs/pages';
import { UsersModule } from 'libs/users';

@Module({
  imports: [TypeOrmModule.forFeature([BooksEntity]), PagesModule, UsersModule],
  providers: [BooksService, ...BooksModuleProviders],
  exports: [BooksService],
})
export class BooksLibModule {}
