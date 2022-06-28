import { Test, TestingModule } from '@nestjs/testing';
import { PlanMaintenanceService } from './plan_maintenance.service';

describe('PlanMaintenanceService', () => {
  let service: PlanMaintenanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanMaintenanceService],
    }).compile();

    service = module.get<PlanMaintenanceService>(PlanMaintenanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
