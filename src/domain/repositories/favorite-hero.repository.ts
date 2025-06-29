import { Hero } from '../entities';

export interface FavoriteHeroRepository {
  findAll(): Promise<Hero[]>;
  findById(id: string): Promise<Hero | null>;
  save(hero: Hero): Promise<void>;
  delete(id: string): Promise<void>;
}
