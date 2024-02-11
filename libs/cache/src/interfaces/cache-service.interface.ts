export interface ICacheService {
  get<ValueType>(key: string): Promise<ValueType>;

  remove(key: string): Promise<string | boolean | number>;

  add<ValueType>(
    key: string,
    value: ValueType,
    expiration?: number,
  ): Promise<string | boolean | number>;
}
