import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IPagesReadingTracking } from '../interfaces';
import { PagesEntity } from 'libs/pages/entities';
import { BooksReadTrackingEntity } from './books-reading-tracking.entity';
import { TABLES } from 'libs/common/constants';

@Entity({ name: TABLES.PAGES_READ_TRACKING })
export class PagesReadingTrackingEntity implements IPagesReadingTracking {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => PagesEntity)
  @JoinColumn({ name: 'page_id' })
  page: PagesEntity;

  @Column({ type: 'int', name: 'page_id', nullable: false })
  public pageId: number;

  @ManyToOne(
    () => BooksReadTrackingEntity,
    (booksReadingTracking) => booksReadingTracking.pagesReadingTracking,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'books_read_tracking_id' })
  booksReadTracking: BooksReadTrackingEntity;

  @Column({ type: 'int', name: 'books_read_tracking_id', nullable: false })
  public booksReadTrackingId: number;

  @Column({ type: 'bigint', name: 'start_read_date', nullable: false })
  public startReadAt: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
