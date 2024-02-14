import { Inject, Injectable } from '@nestjs/common';
import { PAGES_REPOSITORY_TOKEN } from './constants';
import {
  ISavePageCredentials,
  IDeletePageCredentials,
  IPagesRepository,
  IUpdatePageCredentials,
  TFindPagesCredentials,
  ICreatePageCredentials,
  IVerifyIdsInBookCredentials,
  VerifyPageIdsFunctionResponse,
} from './interfaces';
import { TFindPageCredentials } from './types';
import { PageNotFoundException } from './errors';

@Injectable()
export class PagesService {
  constructor(
    @Inject(PAGES_REPOSITORY_TOKEN)
    private readonly pagesRepository: IPagesRepository,
  ) {}

  public async verifyPageIdsInBook(
    credentials: IVerifyIdsInBookCredentials,
  ): Promise<VerifyPageIdsFunctionResponse> {
    const { bookId, pageIds } = credentials;
    const pagesFound = await this.findPages({ bookId, ids: pageIds });

    const verificationResult = {
      validPages: pagesFound,
      invalidIPageIds: [] as number[],
    };

    if (!pagesFound.length) {
      verificationResult.invalidIPageIds = pageIds;
    } else {
      verificationResult.invalidIPageIds = pageIds.filter(
        (pageId) => !pagesFound.some((page) => page.id === pageId),
      );
    }

    return verificationResult;
  }

  public async checkPageExistence(id: number) {
    const page = await this.findPage({ id });
    if (!page) {
      throw new PageNotFoundException(id);
    }

    return true;
  }

  public createPage(credentials: ICreatePageCredentials) {
    return this.pagesRepository.create(credentials);
  }

  public savePage(credentials: ISavePageCredentials) {
    return this.pagesRepository.save(credentials);
  }

  public findPage(credentials: TFindPageCredentials) {
    return this.pagesRepository.findOne(credentials);
  }

  public findPages(credentials: TFindPagesCredentials) {
    return this.pagesRepository.find(credentials);
  }

  public deletePage(credentials: IDeletePageCredentials) {
    return this.pagesRepository.deleteById(credentials);
  }

  public updatePage(credentials: IUpdatePageCredentials) {
    return this.pagesRepository.updateById(credentials);
  }
}
