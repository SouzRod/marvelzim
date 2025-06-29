import { HeroFromApiDto } from 'src/application/dto';
import { Hero } from '../entities';

export class HeroMapper {
  static fromMarvelApi(heroData: HeroFromApiDto): Hero {
    return new Hero(
      heroData.id,
      heroData.name,
      heroData.description || '',
      heroData.thumbnail.path ? `${heroData.thumbnail.path}.${heroData.thumbnail.extension}` : '',
    );
  }
}
