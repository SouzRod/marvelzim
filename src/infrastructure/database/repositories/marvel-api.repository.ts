import { MarvelApiService } from "src/infrastructure/external";
import { Repository } from "src/domain/repositories";
import { PaginationDto } from "src/application/dto";
import { Hero } from "src/domain/entities";
import { HeroMapper } from "src/domain/mapper";

export class MarvelApiRepository implements Repository<PaginationDto> {
  constructor(private readonly marvelApiService: MarvelApiService) { }

  async findAll({ offset, limit }: PaginationDto): Promise<Hero[]> {
    const heroes = await this.marvelApiService.searchHeroes(offset, limit);
    return heroes.map(HeroMapper.fromPrisma);
  }
}
