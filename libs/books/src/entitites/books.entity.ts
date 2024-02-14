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
import { IBook } from '../interface';
import { TABLES } from 'libs/common/constants';
import { UsersEntity } from 'libs/users/entitites';
import { PagesEntity } from 'libs/pages/entities/pages.entity';
import { BooksReadTrackingEntity } from 'libs/read-tracking/entities';

@Entity({ name: TABLES.BOOKS_TABLE })
export class BooksEntity implements IBook {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public description: string;

  @Column({ type: 'varchar', nullable: false })
  public title: string;

  @ManyToOne(() => UsersEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'author_id' })
  user: UsersEntity;

  @Column({ type: 'int', name: 'author_id', nullable: false })
  public authorId: number;

  @OneToMany(() => PagesEntity, (page) => page.book, { cascade: true })
  pages: PagesEntity[];

  @OneToMany(() => BooksReadTrackingEntity, (page) => page.book, { cascade: true })
  booksReadTracking: BooksReadTrackingEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
