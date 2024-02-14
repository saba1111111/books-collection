import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesEntity } from './entities/pages.entity';
import { ModulePagesProviders } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([PagesEntity])],
  providers: [PagesService, ...ModulePagesProviders],
  exports: [PagesService],
})
export class PagesModule {}
