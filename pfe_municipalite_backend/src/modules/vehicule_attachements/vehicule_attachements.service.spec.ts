import { Test, TestingModule } from '@nestjs/testing';
import { VehiculeAttachementsService } from './vehicule_attachements.service';

describe('VehiculeAttachementsService', () => {
  let service: VehiculeAttachementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiculeAttachementsService],
    }).compile();

    service = module.get<VehiculeAttachementsService>(VehiculeAttachementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
