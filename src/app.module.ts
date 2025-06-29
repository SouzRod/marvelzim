import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { FavoriteHeroRepository, MarvelApiRepository } from './infrastructure/database/repositories';
import { MarvelApiService, PrismaService, RedisService } from './infrastructure/external';
import { CacheRepository, Repository } from './domain/repositories';
import { PaginationDto } from './application/dto';
import { HeroController } from './presentation/controllers';
import { GetFavoriteHeroesUseCase, GetHeroListUseCase } from './application/use-cases';
import { RedisCacheRepository } from './infrastructure/database/repositories/cache.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('MARVEL_BASE_URL') as string,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [HeroController],
  providers: [
    PrismaService,
    {
      provide: RedisService,
      useFactory: (configService: ConfigService) =>
        new RedisService({
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
        }),
      inject: [ConfigService],
    },
    {
      provide: MarvelApiService,
      useFactory: (
        httpService: HttpService,
        configService: ConfigService,
      ) => new MarvelApiService(
        httpService,
        configService.get('MARVEL_API_KEY') as string,
        configService.get('MARVEL_HASH') as string,
        configService.get('MARVEL_TS') as string,
      ),
      inject: [HttpService, ConfigService],
    },
    {
      provide: 'FavoriteHeroRepository',
      useFactory: (prismaService: PrismaService) => new FavoriteHeroRepository(prismaService),
      inject: [PrismaService],
    },
    {
      provide: 'MarvelApiRepository',
      useFactory: (marvelApiService: MarvelApiService) => new MarvelApiRepository(marvelApiService),
      inject: [MarvelApiService],
    },
    {
      provide: 'CacheRepository',
      useFactory: (redisService: RedisService) => new RedisCacheRepository(redisService),
      inject: [RedisService],
    },
    {
      provide: GetHeroListUseCase,
      useFactory: (marvelApiRepository: Repository<PaginationDto>, cache: CacheRepository) => new GetHeroListUseCase(marvelApiRepository, cache),
      inject: ['MarvelApiRepository', 'CacheRepository'],
    },
    {
      provide: GetFavoriteHeroesUseCase,
      useFactory: (favoriteHeroRepository: FavoriteHeroRepository) => new GetFavoriteHeroesUseCase(favoriteHeroRepository),
      inject: ['FavoriteHeroRepository'],
    }
  ],
})
export class AppModule { }
