import { Test, TestingModule } from '@nestjs/testing';
import { GestionnaireParcService } from './gestionnaire_parc.service';

describe('GestionnaireParcService', () => {
  let service: GestionnaireParcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionnaireParcService],
    }).compile();

    service = module.get<GestionnaireParcService>(GestionnaireParcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
