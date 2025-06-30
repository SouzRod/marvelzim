import { GetHeroListUseCase } from '../get-hero-list.usecase';
import { MarvelApiRepository, CacheRepository } from 'src/domain/repositories';
import { PaginationDto } from '../../dto';
import { Hero } from 'src/domain/entities';

describe('GetHeroListUseCase', () => {
  let useCase: GetHeroListUseCase;
  let marvelApiRepository: jest.Mocked<MarvelApiRepository>;
  let cache: jest.Mocked<CacheRepository>;

  beforeEach(() => {
    marvelApiRepository = {
      findAll: jest.fn(),
    } as any;
    cache = {
      get: jest.fn(),
      set: jest.fn(),
    } as any;
    useCase = new GetHeroListUseCase(marvelApiRepository, cache);
  });

  it('deve retornar heróis do cache se existir', async () => {
    const heroes: Hero[] = [{ id: 1, name: 'Homem de Ferro', description: '', thumbnail: '' }];
    cache.get.mockResolvedValue(JSON.stringify(heroes));
    const result = await useCase.execute({ offset: '0', limit: '10' });
    expect(result).toEqual(heroes);
    expect(marvelApiRepository.findAll).not.toHaveBeenCalled();
  });

  it('deve buscar heróis da API e salvar no cache se não existir', async () => {
    cache.get.mockResolvedValue(null);
    const heroes: Hero[] = [{ id: 2, name: 'Capitão América', description: '', thumbnail: '' }];
    marvelApiRepository.findAll.mockResolvedValue(heroes);
    const result = await useCase.execute({ offset: '0', limit: '10' });
    expect(result).toEqual(heroes);
    expect(cache.set).toHaveBeenCalledWith('hero_list_0_10', JSON.stringify(heroes), 3600);
  });
});
