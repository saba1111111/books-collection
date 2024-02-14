import { Module } from '@nestjs/common';
import { ReadTrackingModuleDatabaseProviders } from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksReadTrackingEntity, PagesReadingTrackingEntity } from './entities';
import { BooksReadTrackingService } from './services';
import { PageReadTrackingService } from './services/page-read-tracking.service';
import { ReadTrackService } from './services/read-track.service';
import { BooksLibModule } from 'libs/books';
import { PagesModule } from 'libs/pages';

@Module({
  imports: [
    TypeOrmModule.forFeature([PagesReadingTrackingEntity, BooksReadTrackingEntity]),
    BooksLibModule,
    PagesModule,
  ],
  providers: [
    ...ReadTrackingModuleDatabaseProviders,
    BooksReadTrackingService,
    PageReadTrackingService,
    ReadTrackService,
  ],
  exports: [ReadTrackService],
})
export class ReadTrackingLibModule {}
