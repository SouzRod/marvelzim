import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";

export class MarvelApiService {
  // private readonly baseUrl: string = process.env.MARVEL_BASE_URL as string;
  // private readonly apiKey: string = process.env.MARVEL_API_KEY as string;
  // private readonly hash: string = process.env.MARVEL_HASH as string;
  // private readonly ts: string = process.env.MARVEL_TS as string;

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