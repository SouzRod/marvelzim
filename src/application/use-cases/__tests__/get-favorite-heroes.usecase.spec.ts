import { GetFavoriteHeroesUseCase } from '../get-favorite-heroes.usecase';
import { FavoriteHeroRepository } from 'src/domain/repositories';
import { Hero } from 'src/domain/entities';

describe('GetFavoriteHeroesUseCase', () => {
  let useCase: GetFavoriteHeroesUseCase;
  let favoriteHeroRepository: jest.Mocked<FavoriteHeroRepository>;

  beforeEach(() => {
    favoriteHeroRepository = {
      findAll: jest.fn(),
    } as any;
    useCase = new GetFavoriteHeroesUseCase(favoriteHeroRepository);
  });

  it('deve retornar todos os heróis favoritos', async () => {
    const heroes: Hero[] = [{ id: 1, name: 'Homem de Ferro', description: '', thumbnail: '' }];
    favoriteHeroRepository.findAll.mockResolvedValue(heroes);
    const result = await useCase.execute();
    expect(result).toEqual(heroes);
  });
});
