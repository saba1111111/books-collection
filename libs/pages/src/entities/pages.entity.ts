import { BooksEntity } from 'libs/books/entitites';
import { TABLES } from 'libs/common/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IPage } from '../interfaces';

@Entity({ name: TABLES.PAGES_TABLE })
export class PagesEntity implements IPage {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'text', nullable: false })
  public content: string;

  @Column({ type: 'int', name: 'page_number', nullable: false })
  public pageNumber: number;

  @ManyToOne(() => BooksEntity, (book) => book.pages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'book_id' })
  book: BooksEntity;

  @Column({ type: 'int', name: 'book_id', nullable: false })
  public bookId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
