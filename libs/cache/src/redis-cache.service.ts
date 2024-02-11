import { Injectable } from '@nestjs/common';
import { ICacheService } from './interfaces';
import Redis from 'ioredis';
import { ENVS } from 'libs/common/constants';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'libs/mail/services';

@Injectable()
export class RedisCacheService implements ICacheService {
  private redisClient: Redis;

  public constructor(private readonly configService: ConfigService) {
    this.redisClient = new Redis({
      host: configService.get<string>(ENVS.REDIS_HOST),
      port: Number(configService.get<string>(ENVS.REDIS_PORT)),
    });

    this.redisClient.on('error', (error) => {
      this.redisClient = null;
      console.log(`Failed connection to redis: ${error.message}!`);
    });

    this.redisClient.on('connect', () => {
      console.log('Successfully connect redis!');
    });
  }

  public async add<T>(key: string, value: T): Promise<'OK'>;
  public async add<T>(key: string, value: T, expiration: number): Promise<'OK'>;
  public async add<T>(key: string, value: T, expiration?: number) {
    const stringifyValue = JSON.stringify(value);

    if (expiration !== undefined && expiration > 0) {
      return this.redisClient.set(key, stringifyValue, 'EX', expiration);
    } else {
      return this.redisClient.set(key, stringifyValue);
    }
  }

  public async get<T>(key: string): Promise<T> {
    const data = await this.redisClient.get(key);
    const parsedData = data ? (JSON.parse(data) as T) : null;

    return parsedData;
  }

  public remove(key: string): Promise<number> {
    return this.redisClient.del(key);
  }
}
