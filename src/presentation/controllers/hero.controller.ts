import { Controller, Get, Query } from "@nestjs/common";
import { PaginationDto } from "src/application/dto";
import { GetHeroListUseCase } from "src/application/use-cases";
import { GetFavoriteHeroesUseCase } from "src/application/use-cases/get-favorite-heroes.usecase";
import { Hero } from "src/domain/entities";

@Controller('v1/marvel')
export class HeroController {
  constructor(
    private readonly getHeroListUseCase: GetHeroListUseCase,
    private readonly getFavoriteHeroesUseCase: GetFavoriteHeroesUseCase,
  ) { }

  @Get('heroes')
  async getHeroes(@Query() pagination: PaginationDto): Promise<Hero[]> {
    return this.getHeroListUseCase.execute(pagination);
  }

  @Get('heroes/favorites')
  async getFavoriteHeroes(): Promise<Hero[]> {
    return this.getFavoriteHeroesUseCase.execute();
  }
}