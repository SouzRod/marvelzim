import { Injectable } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor(options: RedisOptions) {
    this.client = new Redis(options);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, expire?: number): Promise<'OK'> {
    if (expire) {
      return this.client.set(key, value, 'EX', expire);
    }
    return this.client.set(key, value);
  }
}