import { Test, TestingModule } from '@nestjs/testing';
import { VignettesService } from './vignettes.service';

describe('VignettesService', () => {
  let service: VignettesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VignettesService],
    }).compile();

    service = module.get<VignettesService>(VignettesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
