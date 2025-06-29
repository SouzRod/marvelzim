import { Hero } from 'src/domain/entities';
import { FavoriteHeroRepository } from 'src/domain/repositories';

export class GetFavoriteHeroesUseCase {
  constructor(private readonly favoriteHeroRepository: FavoriteHeroRepository) {}

  async execute(): Promise<Hero[]> {
    return await this.favoriteHeroRepository.findAll();
  }
}
