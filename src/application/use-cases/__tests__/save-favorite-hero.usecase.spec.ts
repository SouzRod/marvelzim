import { SaveFavoriteHeroUseCase } from '../save-favorite-hero.usecase';
import { FavoriteHeroRepository } from 'src/domain/repositories/favorite-hero.repository';
import { MarvelApiRepository } from 'src/domain/repositories/marvel-api.repository';

describe('SaveFavoriteHeroUseCase', () => {
  let useCase: SaveFavoriteHeroUseCase;
  let favoriteHeroRepository: jest.Mocked<FavoriteHeroRepository>;
  let marvelApiRepository: jest.Mocked<MarvelApiRepository>;

  beforeEach(() => {
    favoriteHeroRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    } as any;
    marvelApiRepository = {
      findById: jest.fn(),
    } as any;
    useCase = new SaveFavoriteHeroUseCase(favoriteHeroRepository, marvelApiRepository);
  });

  it('não deve salvar se já existir nos favoritos', async () => {
    favoriteHeroRepository.findById.mockResolvedValue({ id: 1, name: '', description: '', thumbnail: '' });
    await useCase.execute('1');
    expect(favoriteHeroRepository.save).not.toHaveBeenCalled();
  });

  it('deve buscar na API e salvar se não existir nos favoritos', async () => {
    favoriteHeroRepository.findById.mockResolvedValue(null);
    marvelApiRepository.findById.mockResolvedValue({ id: 2, name: 'Thor', description: '', thumbnail: '' });
    await useCase.execute('2');
    expect(marvelApiRepository.findById).toHaveBeenCalledWith('2');
    expect(favoriteHeroRepository.save).toHaveBeenCalledWith({ id: 2, name: 'Thor', description: '', thumbnail: '' });
  });
});
