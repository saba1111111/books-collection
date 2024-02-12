import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IBook } from '../interface';
import { TABLES } from 'libs/common/constants';
import { UsersEntity } from 'libs/users/entitites';

@Entity({ name: TABLES.BOOKS_TABLE })
export class BooksEntity implements IBook {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public description: string;

  @Column({ type: 'varchar', nullable: false })
  public title: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'author_id' })
  user: UsersEntity;

  @Column({ type: 'int', name: 'author_id', nullable: false })
  public authorId: number;
}
