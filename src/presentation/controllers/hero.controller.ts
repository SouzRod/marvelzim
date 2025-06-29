import { Controller, Get, Query } from "@nestjs/common";
import { PaginationDto } from "src/application/dto";
import { GetHeroListUseCase } from "src/application/use-cases";
import { Hero } from "src/domain/entities";

@Controller('v1/marvel')
export class HeroController {
  constructor(
    private readonly getHeroListUseCase: GetHeroListUseCase,
  ) {}

  @Get('heroes')
  async getHeroes(@Query() pagination: PaginationDto): Promise<Hero[]> {
    return this.getHeroListUseCase.execute(pagination);
  }
}