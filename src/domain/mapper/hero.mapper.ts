import { Hero } from "../entities";

export class HeroMapper {
  static fromPrisma(heroData: any): Hero {
    return new Hero(
      heroData.id,
      heroData.name,
      heroData.description || "",
      heroData.thumbnail.path ? `${heroData.thumbnail.path}.${heroData.thumbnail.extension}` : "",
    );
  }
}