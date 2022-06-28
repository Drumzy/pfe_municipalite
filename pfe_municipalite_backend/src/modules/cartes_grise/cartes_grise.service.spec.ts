import { Test, TestingModule } from '@nestjs/testing';
import { CartesGriseService } from './cartes_grise.service';

describe('CartesGriseService', () => {
  let service: CartesGriseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartesGriseService],
    }).compile();

    service = module.get<CartesGriseService>(CartesGriseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
