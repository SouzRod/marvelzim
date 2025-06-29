import { CacheRepository } from 'src/domain/repositories';
import { RedisService } from 'src/infrastructure/external';

export class RedisCacheRepository implements CacheRepository {
  constructor(private readonly redisService: RedisService) {}

  async get(key: string) {
    return this.redisService.get(key);
  }

  async set(key: string, value: string, expire?: number) {
    await this.redisService.set(key, value, expire);
  }
}