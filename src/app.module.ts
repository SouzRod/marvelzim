import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { FavoriteHeroRepository, MarvelApiRepository } from './infrastructure/database/repositories';
import { MarvelApiService, PrismaService } from './infrastructure/external';
import { Repository } from './domain/repositories';
import { PaginationDto } from './application/dto';
import { HeroController } from './presentation/controllers';
import { GetFavoriteHeroesUseCase, GetHeroListUseCase } from './application/use-cases';

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
      provide: GetHeroListUseCase,
      useFactory: (marvelApiRepository: Repository<PaginationDto>) => new GetHeroListUseCase(marvelApiRepository),
      inject: ['MarvelApiRepository'],
    },
    {
      provide: GetFavoriteHeroesUseCase,
      useFactory: (favoriteHeroRepository: FavoriteHeroRepository) => new GetFavoriteHeroesUseCase(favoriteHeroRepository),
      inject: ['FavoriteHeroRepository'],
    }
  ],
})
export class AppModule { }
