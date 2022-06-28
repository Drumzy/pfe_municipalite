import { Test, TestingModule } from '@nestjs/testing';
import { RapportInterventionService } from './rapport_intervention.service';

describe('RapportInterventionService', () => {
  let service: RapportInterventionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RapportInterventionService],
    }).compile();

    service = module.get<RapportInterventionService>(RapportInterventionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
