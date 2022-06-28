import { Test, TestingModule } from '@nestjs/testing';
import { BonTravailService } from './bon_travail.service';

describe('BonTravailService', () => {
  let service: BonTravailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BonTravailService],
    }).compile();

    service = module.get<BonTravailService>(BonTravailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
