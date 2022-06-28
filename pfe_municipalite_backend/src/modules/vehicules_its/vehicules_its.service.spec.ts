import { Test, TestingModule } from '@nestjs/testing';
import { VehiculesItsService } from './vehicules_its.service';

describe('VehiculesItsService', () => {
  let service: VehiculesItsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiculesItsService],
    }).compile();

    service = module.get<VehiculesItsService>(VehiculesItsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
