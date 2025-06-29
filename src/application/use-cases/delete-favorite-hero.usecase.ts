import { FavoriteHeroRepository } from 'src/domain/repositories';

export class DeleteFavoriteHeroUseCase {
  constructor(private readonly favoriteHeroRepository: FavoriteHeroRepository) {}

  async execute(heroId: string): Promise<void> {
    const existingHero = await this.favoriteHeroRepository.findById(heroId);
    if (!existingHero) {
      throw new Error(`Hero with id ${heroId} not found in favorites.`);
    }

    await this.favoriteHeroRepository.delete(heroId);
  }
}
