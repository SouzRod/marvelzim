import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { HeroController } from './presentation/controllers';

import { FavoriteHeroRepositoryImpl, MarvelApiRepositoryImpl, CacheRepositoryImpl } from './infrastructure/database/repositories';
import { FavoriteHeroRepository, MarvelApiRepository, CacheRepository } from './domain/repositories';
import { PrismaService, MarvelApiService, RedisService } from './infrastructure/external';

import { DeleteFavoriteHeroUseCase, GetFavoriteHeroesUseCase, GetHeroListUseCase, SaveFavoriteHeroUseCase } from './application/use-cases';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
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
      useFactory: (httpService: HttpService, configService: ConfigService) =>
        new MarvelApiService(
          httpService,
          configService.get('MARVEL_API_KEY') as string,
          configService.get('MARVEL_HASH') as string,
          configService.get('MARVEL_TS') as string,
        ),
      inject: [HttpService, ConfigService],
    },
    {
      provide: 'FavoriteHeroRepository',
      useFactory: (prismaService: PrismaService) => new FavoriteHeroRepositoryImpl(prismaService),
      inject: [PrismaService],
    },
    {
      provide: 'MarvelApiRepository',
      useFactory: (marvelApiService: MarvelApiService) => new MarvelApiRepositoryImpl(marvelApiService),
      inject: [MarvelApiService],
    },
    {
      provide: 'CacheRepository',
      useFactory: (redisService: RedisService) => new CacheRepositoryImpl(redisService),
      inject: [RedisService],
    },
    {
      provide: GetHeroListUseCase,
      useFactory: (marvelApiRepository: MarvelApiRepository, cache: CacheRepository) => new GetHeroListUseCase(marvelApiRepository, cache),
      inject: ['MarvelApiRepository', 'CacheRepository'],
    },
    {
      provide: GetFavoriteHeroesUseCase,
      useFactory: (favoriteHeroRepository: FavoriteHeroRepository) => new GetFavoriteHeroesUseCase(favoriteHeroRepository),
      inject: ['FavoriteHeroRepository'],
    },
    {
      provide: SaveFavoriteHeroUseCase,
      useFactory: (favoriteHeroRepository: FavoriteHeroRepository, marvelApiRepository: MarvelApiRepository) =>
        new SaveFavoriteHeroUseCase(favoriteHeroRepository, marvelApiRepository),
      inject: ['FavoriteHeroRepository', 'MarvelApiRepository'],
    },
    {
      provide: DeleteFavoriteHeroUseCase,
      useFactory: (favoriteHeroRepository: FavoriteHeroRepository) => new DeleteFavoriteHeroUseCase(favoriteHeroRepository),
      inject: ['FavoriteHeroRepository'],
    },
  ],
})
export class AppModule {}
