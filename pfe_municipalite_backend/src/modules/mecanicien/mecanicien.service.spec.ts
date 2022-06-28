import { Test, TestingModule } from '@nestjs/testing';
import { MecanicienService } from './mecanicien.service';

describe('MecanicienService', () => {
  let service: MecanicienService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MecanicienService],
    }).compile();

    service = module.get<MecanicienService>(MecanicienService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
