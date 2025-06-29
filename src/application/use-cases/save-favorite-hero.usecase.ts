import { FavoriteHeroRepository } from 'src/domain/repositories/favorite-hero.repository';
import { MarvelApiRepository } from 'src/domain/repositories/marvel-api.repository';

export class SaveFavoriteHeroUseCase {
  constructor(
    private readonly favoriteHeroRepository: FavoriteHeroRepository,
    private readonly marvelApiRepository: MarvelApiRepository,
  ) {}

  async execute(heroId: string): Promise<void> {
    const existingHero = await this.favoriteHeroRepository.findById(heroId);
    if (existingHero) {
      return;
    }

    const hero = await this.marvelApiRepository.findById(heroId);
    await this.favoriteHeroRepository.save(hero);
  }
}
