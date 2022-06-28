import { Test, TestingModule } from '@nestjs/testing';
import { InterventionPersonneleService } from './intervention_personnele.service';

describe('InterventionPersonneleService', () => {
  let service: InterventionPersonneleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterventionPersonneleService],
    }).compile();

    service = module.get<InterventionPersonneleService>(InterventionPersonneleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
