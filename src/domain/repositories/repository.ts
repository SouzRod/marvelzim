import { Hero } from "../entities";

export interface Repository<T = void> {
  findAll(pagination?: T): Promise<Hero[]>;
}
