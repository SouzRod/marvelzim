import { Repository } from "src/domain/repositories/repository";
import { PrismaService } from "src/infrastructure/external";
import { Hero } from "src/domain/entities";

export class FavoriteHeroRepository implements Repository {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll(): Promise<Hero[]> {
    const heroes = await this.prismaService.favoriteHero.findMany();
    return heroes.map(heroData => new Hero(
      heroData.id,
      heroData.name,
      heroData.description || "",
      heroData.thumbnail || "",
    ));
  }
}