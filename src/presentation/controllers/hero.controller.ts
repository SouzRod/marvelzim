import { Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { PaginationDto } from "src/application/dto";
import { DeleteFavoriteHeroUseCase, GetHeroListUseCase, SaveFavoriteHeroUseCase } from "src/application/use-cases";
import { GetFavoriteHeroesUseCase } from "src/application/use-cases/get-favorite-heroes.usecase";
import { Hero } from "src/domain/entities";

@Controller('v1/marvel')
export class HeroController {
  constructor(
    private readonly getHeroListUseCase: GetHeroListUseCase,
    private readonly getFavoriteHeroesUseCase: GetFavoriteHeroesUseCase,
    private readonly saveFavoriteHeroUseCase: SaveFavoriteHeroUseCase,
    private readonly deleteFavoriteHeroUseCase: DeleteFavoriteHeroUseCase,
  ) { }

  @Get('heroes')
  async getHeroes(@Query() pagination: PaginationDto): Promise<Hero[]> {
    return this.getHeroListUseCase.execute(pagination);
  }

  @Get('heroes/favorites')
  async getFavoriteHeroes(): Promise<Hero[]> {
    return this.getFavoriteHeroesUseCase.execute();
  }

  @Post('hero/favorite')
  async saveFavoriteHero(@Query('id') id: string): Promise<void> {
    return this.saveFavoriteHeroUseCase.execute(id);
  }

  @Delete('hero/favorite')
  async deleteFavoriteHero(@Query('id') id: string): Promise<void> {
    return this.deleteFavoriteHeroUseCase.execute(id);
  }
}