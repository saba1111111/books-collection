import { TABLES } from 'libs/common/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from 'libs/users/entitites';
import { BooksEntity } from 'libs/books/entitites';
import { IBooksReadTracking } from '../interfaces';
import { PagesReadingTrackingEntity } from './pages-reading-tracking.entity';

@Entity({ name: TABLES.BOOKS_READ_TRACKING })
export class BooksReadTrackingEntity implements IBooksReadTracking {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => UsersEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column({ type: 'int', name: 'user_id', nullable: false })
  public userId: number;

  @ManyToOne(() => BooksEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: BooksEntity;

  @Column({ type: 'int', name: 'book_id', nullable: false })
  public bookId: number;

  @Column({ type: 'bigint', name: 'start_read_date', nullable: false })
  public startReadAt: number;

  @OneToMany(
    () => PagesReadingTrackingEntity,
    (PagesReadingTracking) => PagesReadingTracking.booksReadTracking,
  )
  pagesReadingTracking: PagesReadingTrackingEntity[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
