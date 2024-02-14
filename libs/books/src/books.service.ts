import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  BOOKS_REPOSITORY_TOKEN,
  DEFAULT_NUM_OF_BOOKS_RETURNED_PER_PAGE,
} from './constants';
import {
  IBooksRepository,
  ISaveBookCredentials,
  IDeleteBookCredentials,
  IUpdateBookCredentials,
  ICreateBookCredentials,
  CheckBookExistenceWithTitle,
  IFindBooksCredentials,
  VerifyBookAuthorship,
  UpdateBookDetailsData,
} from './interface';
import { TFindBookCredentials } from './types';
import { TUserSafe } from 'libs/users/types';
import { PagesService } from 'libs/pages';
import { UsersService } from 'libs/users';
import { handleError } from 'libs/common/helpers';
import {
  BookNotFoundException,
  DuplicateBookInUserListException,
  UnauthorizedBookUpdateException,
  UnchangedTitleException,
  WrongPageIdsException,
} from './errors';

@Injectable()
export class BooksService {
  constructor(
    @Inject(BOOKS_REPOSITORY_TOKEN) private readonly booksRepository: IBooksRepository,
    private readonly pagesService: PagesService,
    private readonly userService: UsersService,
  ) {}

  public async deleteBook(bookId: number, user: TUserSafe) {
    try {
      const { book } = await this.findBookById(bookId);

      if (book.authorId !== user.id) {
        throw new UnauthorizedBookUpdateException();
      }

      await this.deleteBookById({ id: bookId });

      return { message: 'Successfully delete book.' };
    } catch (error) {
      handleError(error);
    }
  }

  public async updateBookDetails(credentials: UpdateBookDetailsData, user: TUserSafe) {
    try {
      const { bookId, updateData } = credentials;

      const book = await this.verifyBookAuthorship({ bookId, userId: user.id });

      if (updateData.description) {
        book.description = updateData.description;
      }

      if (updateData.title) {
        if (updateData.title === book.title) {
          throw new UnchangedTitleException();
        }

        await this.checkIfBookWithThisTitleAlreadyExist({
          authorId: user.id,
          title: updateData.title,
        });
        book.title = updateData.title;
      }

      let updatedPages = [];
      if (updateData.pages) {
        const pagesData = await this.pagesService.verifyPageIdsInBook({
          bookId,
          pageIds: updateData.pages.map((page) => page.id),
        });
        if (pagesData.invalidIPageIds.length) {
          throw new WrongPageIdsException(bookId, pagesData.invalidIPageIds);
        }

        pagesData.validPages.forEach((page) => {
          const updatePage = updateData.pages.find(
            (updatePage) => updatePage.id === page.id,
          );
          page.content = updatePage.content;
        });

        updatedPages = pagesData.validPages;
      }

      await this.booksRepository.updateFullBook({ book, pages: updatedPages });

      return { message: 'Successfully update book.' };
    } catch (error) {
      handleError(error);
    }
  }

  public async findBooks(credentials: IFindBooksCredentials) {
    try {
      const { numberOfItemsPerPage, createdAt, updatedAt, page, authorId } = credentials;

      if (authorId) {
        await this.userService.checkUserExistence(authorId);
      }

      const maxNumberOfItemsPerPage =
        +numberOfItemsPerPage || DEFAULT_NUM_OF_BOOKS_RETURNED_PER_PAGE;

      const PaginationData = {
        take: maxNumberOfItemsPerPage,
        skip: page ? (page - 1) * maxNumberOfItemsPerPage : 0,
        order: { createdAt, updatedAt },
      };

      const [books, totalNumberOfBooks] = await this.booksRepository.find({
        Pagination: PaginationData,
        Where: { ...(authorId ? { authorId } : {}) },
      });

      const response = {
        books,
        page: page || 1,
        maxNumberOfItemsPerPage,
        totalNumberOfPages: Math.ceil(totalNumberOfBooks / maxNumberOfItemsPerPage) || 1,
      };

      return { message: 'Successfully fetch books.', ...response };
    } catch (error) {
      handleError(error);
    }
  }

  public async findBookById(id: number) {
    try {
      const book = await this.findBook({ id });
      if (!book) {
        throw new BookNotFoundException();
      }

      return { message: 'Successfully find book.', book };
    } catch (error) {
      handleError(error);
    }
  }

  public async createBook(credentials: ICreateBookCredentials, user: TUserSafe) {
    try {
      const { description, pages, title } = credentials;
      await this.checkIfBookWithThisTitleAlreadyExist({ authorId: user.id, title });

      const createdPages = pages.map((page) => this.pagesService.createPage(page));
      await this.saveBook({ authorId: user.id, description, title, pages: createdPages });

      return { message: 'Successfully created book.' };
    } catch (error) {
      handleError(error);
    }
  }

  private async checkIfBookWithThisTitleAlreadyExist(
    credentials: CheckBookExistenceWithTitle,
  ) {
    const { authorId, title } = credentials;

    const book = await this.findBook({ authorId, title });
    if (book) {
      throw new DuplicateBookInUserListException();
    }
  }

  private async verifyBookAuthorship(credentials: VerifyBookAuthorship) {
    const book = await this.findBook({ id: credentials.bookId });
    if (!book) {
      throw new BookNotFoundException();
    }

    if (book.authorId !== credentials.userId) {
      throw new UnauthorizedBookUpdateException();
    }

    return book;
  }

  public saveBook(credentials: ISaveBookCredentials) {
    return this.booksRepository.save(credentials);
  }

  public findBook(credentials: TFindBookCredentials) {
    return this.booksRepository.findOne(credentials);
  }

  public deleteBookById(credentials: IDeleteBookCredentials) {
    return this.booksRepository.deleteById(credentials);
  }

  public updateBook(credentials: IUpdateBookCredentials) {
    return this.booksRepository.updateById(credentials);
  }
}
