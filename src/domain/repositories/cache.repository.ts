export interface CacheRepository {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, expire?: number): Promise<void>;
}
