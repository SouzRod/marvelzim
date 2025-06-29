import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";

export class MarvelApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly apiKey: string,
    private readonly hash: string,
    private readonly ts: string,
  ) { }

  async searchHeroes(offset: string, limit: string) {
    const url = `/characters?offset=${offset}&limit=${limit}&apikey=${this.apiKey}&hash=${this.hash}&ts=${this.ts}`;
    const { data: { data } } = await firstValueFrom(this.httpService.get(url));
    return data.results;
  }
}