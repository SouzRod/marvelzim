import { CacheRepository, MarvelApiRepository } from 'src/domain/repositories';
import { Hero } from 'src/domain/entities';
import { PaginationDto } from '../dto';

export class GetHeroListUseCase {
  constructor(
    private readonly marvelApiRepository: MarvelApiRepository,
    private readonly cache: CacheRepository,
  ) {}

  async execute(pagination: PaginationDto): Promise<Hero[]> {
    const cacheKey = `hero_list_${pagination.offset}_${pagination.limit}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return JSON.parse(cached) as Hero[];
    }

    const heroes = await this.marvelApiRepository.findAll(pagination);

    await this.cache.set(cacheKey, JSON.stringify(heroes), 3600);

    return heroes;
  }
}
