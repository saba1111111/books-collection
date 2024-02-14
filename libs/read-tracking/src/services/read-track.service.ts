import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BooksService } from 'libs/books';
import { PagesService } from 'libs/pages';
import { IUser } from 'libs/users/interfaces';
import { BooksReadTrackingService } from './books-read-tracking.service';
import { PageReadTrackingService } from './page-read-tracking.service';
import { TrackReadCredentials } from '../interfaces';
import { TUserSafe } from 'libs/users/types';
import { handleError } from 'libs/common/helpers';
import { BookNotStartedException, UserProgressNotFoundException } from '../errors';

@Injectable()
export class ReadTrackService {
  constructor(
    private readonly booksService: BooksService,
    private readonly pageService: PagesService,
    private readonly booksReadTrackingService: BooksReadTrackingService,
    private readonly pageReadTrackingService: PageReadTrackingService,
  ) {}

  public async trackRead(credentials: TrackReadCredentials, user: TUserSafe) {
    const { bookId, pageId } = credentials;
    try {
      const userId = user.id;
      await this.booksService.findBookById(bookId);
      await this.pageService.checkPageExistence(pageId);

      let bookReadTrackingItem =
        await this.booksReadTrackingService.findBookReadTrackingItem({
          bookId,
          userId,
        });
      if (!bookReadTrackingItem) {
        bookReadTrackingItem =
          await this.booksReadTrackingService.saveBooksReadTrackingItem({
            bookId,
            userId,
            startReadAt: Date.now(),
          });
      }

      await this.pageReadTrackingService.savePagesReadTrackingItem({
        booksReadTrackingId: bookReadTrackingItem.id,
        pageId,
        startReadAt: Date.now(),
      });

      return { message: 'Successfully tracked your reading progress.' };
    } catch (error) {
      handleError(error);
    }
  }

  public async findLastReadPage(credentials: { bookId: number }, user: TUserSafe) {
    const { bookId } = credentials;
    try {
      const userId = user.id;
      await this.booksService.findBookById(bookId);

      let bookReadTrackingItem =
        await this.booksReadTrackingService.findBookReadTrackingItem({
          bookId,
          userId,
        });
      if (!bookReadTrackingItem) {
        throw new BookNotStartedException();
      }

      const lastPageReadItem = await this.pageReadTrackingService.findLastReadPage({
        bookReadTrackingId: bookReadTrackingItem.id,
      });
      if (!lastPageReadItem) {
        throw new UserProgressNotFoundException();
      }

      return {
        message: 'Successfully find your progress on this book!',
        lastPageReadItem,
      };
    } catch (error) {
      handleError(error);
    }
  }
}
