import { Repository } from "src/domain/repositories/repository";
import { PaginationDto } from "../dto";
import { Hero } from "src/domain/entities";

export class GetHeroListUseCase {
  constructor(
    private readonly marvelApiRepository: Repository<PaginationDto>,
  ) {}

  async execute(pagination: PaginationDto): Promise<Hero[]> {
    const heroes = await this.marvelApiRepository.findAll(pagination);

    return heroes;
  }
}