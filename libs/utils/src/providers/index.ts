import {
  GENERATOR_SERVICE_TOKEN,
  HASH_SERVICE_TOKEN,
  TOKENS_SERVICE_TOKEN,
} from '../constants';
import { BcryptService, CustomGeneratorService, JwtService } from '../services';

export const UtilsModuleProviders = [
  {
    provide: HASH_SERVICE_TOKEN,
    useClass: BcryptService,
  },
  {
    provide: GENERATOR_SERVICE_TOKEN,
    useClass: CustomGeneratorService,
  },
  {
    provide: TOKENS_SERVICE_TOKEN,
    useClass: JwtService,
  },
];
