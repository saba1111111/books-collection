export interface IHashService {
  hash(data: string | Buffer): Promise<string>;
  compare(value: string | Buffer, encryptedValue: string): Promise<boolean>;
}
