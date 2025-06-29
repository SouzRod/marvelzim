import { Repository } from "src/domain/repositories/repository";
import { PrismaService } from "src/infrastructure/external";
import { Hero } from "src/domain/entities";

export class FavoriteHeroRepository implements Repository {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll(): Promise<Hero[]> {
    return await this.prismaService.favoriteHero.findMany();
  }
}