import { FavoriteHeroRepository } from "src/domain/repositories";
import { PrismaService } from "src/infrastructure/external";
import { Hero } from "src/domain/entities";

export class FavoriteHeroRepositoryImpl implements FavoriteHeroRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll(): Promise<Hero[]> {
    return await this.prismaService.favoriteHero.findMany();
  }

  async findById(id: string): Promise<Hero | null> {
    return await this.prismaService.favoriteHero.findUnique({
      where: { id: Number(id) },
    });
  }

  async save(hero: Hero): Promise<void> {
    await this.prismaService.favoriteHero.create({
      data: {
        id: hero.id,
        name: hero.name,
        description: hero.description,
        thumbnail: hero.thumbnail,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.favoriteHero.delete({
      where: { id: Number(id) },
    });
  }
}