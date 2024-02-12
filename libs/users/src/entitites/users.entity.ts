import { TABLES } from 'libs/common/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces';

@Entity({ name: TABLES.USERS_TABLE })
export class UsersEntity implements IUser {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'varchar', nullable: false })
  public email: string;

  @Column({ type: 'varchar', nullable: false })
  public password: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  public verified: boolean;
}
