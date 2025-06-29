import { MarvelApiService } from "src/infrastructure/external";
import { MarvelApiRepository } from "src/domain/repositories";
import { PaginationDto } from "src/application/dto";
import { Hero } from "src/domain/entities";
import { HeroMapper } from "src/domain/mapper";

export class MarvelApiRepositoryImpl implements MarvelApiRepository {
  constructor(private readonly marvelApiService: MarvelApiService) { }

  async findAll({ offset, limit }: PaginationDto): Promise<Hero[]> {
    const heroes = await this.marvelApiService.searchHeroes(offset, limit);
    return heroes.map(HeroMapper.fromMarvelApi);
  }

  async findById(id: string): Promise<Hero> {
    const hero = await this.marvelApiService.getHeroById(id);  
    return HeroMapper.fromMarvelApi(hero);
  }
}
