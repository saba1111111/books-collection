import { Inject, Injectable } from '@nestjs/common';
import { PAGES_READ_TRACKING_REPOSITORY_TOKEN } from '../constants';
import { IPagesReadingTrackingRepository } from '../interfaces/pages-reading-tracking-repository.interface ';
import { ISavePageReadTrackingCredentials } from '../interfaces/save-page-read-tracking-credentials';
import { IFindLastPageReadTrackingCredentials } from '../interfaces';

@Injectable()
export class PageReadTrackingService {
  constructor(
    @Inject(PAGES_READ_TRACKING_REPOSITORY_TOKEN)
    private readonly pagesReadTrackingRepository: IPagesReadingTrackingRepository,
  ) {}

  public savePagesReadTrackingItem(credentials: ISavePageReadTrackingCredentials) {
    return this.pagesReadTrackingRepository.save(credentials);
  }

  public findLastReadPage(credentials: IFindLastPageReadTrackingCredentials) {
    return this.pagesReadTrackingRepository.findLastPageReadTrackingItem(credentials);
  }
}
