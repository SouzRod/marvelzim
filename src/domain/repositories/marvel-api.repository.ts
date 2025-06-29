import { PaginationDto } from 'src/application/dto/pagination.dto';
import { Hero } from '../entities';

export interface MarvelApiRepository {
  findAll(pagination?: PaginationDto): Promise<Hero[]>;
  findById(id: string): Promise<Hero>;
}
