import { Module } from '@nestjs/common';
import { ReadTrackingController } from './read-tracking.controller';
import { ReadTrackingLibModule } from 'libs/read-tracking';
import { UsersModule } from 'libs/users';

@Module({
  imports: [ReadTrackingLibModule, UsersModule],
  controllers: [ReadTrackingController],
})
export class ReadTrackingModule {}
