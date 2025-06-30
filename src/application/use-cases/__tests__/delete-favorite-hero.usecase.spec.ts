import { DeleteFavoriteHeroUseCase } from '../delete-favorite-hero.usecase';
import { FavoriteHeroRepository } from 'src/domain/repositories';

describe('DeleteFavoriteHeroUseCase', () => {
  let useCase: DeleteFavoriteHeroUseCase;
  let favoriteHeroRepository: jest.Mocked<FavoriteHeroRepository>;

  beforeEach(() => {
    favoriteHeroRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as any;
    useCase = new DeleteFavoriteHeroUseCase(favoriteHeroRepository);
  });

  it('deve deletar um herói favorito existente', async () => {
    favoriteHeroRepository.findById.mockResolvedValue({ id: 1, name: '', description: '', thumbnail: '' });
    await useCase.execute('1');
    expect(favoriteHeroRepository.delete).toHaveBeenCalledWith('1');
  });

  it('deve lançar erro se o herói não existir', async () => {
    favoriteHeroRepository.findById.mockResolvedValue(null);
    await expect(useCase.execute('2')).rejects.toThrow('Hero with id 2 not found in favorites.');
  });
});
