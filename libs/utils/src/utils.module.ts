import { Module } from '@nestjs/common';
import { UtilsModuleProviders } from './providers';

@Module({
  providers: [...UtilsModuleProviders],
  exports: [...UtilsModuleProviders],
})
export class UtilsModule {}
