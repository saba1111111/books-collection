import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksEntity } from './entitites';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModuleProviders } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([BooksEntity])],
  providers: [BooksService, ...BooksModuleProviders],
  exports: [BooksService],
})
export class BooksModule {}
