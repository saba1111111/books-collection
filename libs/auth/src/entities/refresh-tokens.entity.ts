import { TABLES } from 'libs/common/constants';
import { UsersEntity } from 'libs/users/entitites';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RefreshTokens } from '../interfaces';

@Entity({ name: TABLES.REFRESH_TOKENS_TABLE })
export class RefreshTokensEntity implements RefreshTokens {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'text', nullable: false })
  public token: string;

  @Column({ type: 'text', name: 'device_id', nullable: false })
  public deviceId: string;

  @Column({ type: 'bigint', name: 'expire_date', nullable: false })
  public expireDate: number;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column({ type: 'int', name: 'user_id', nullable: false })
  userId: number;
}
