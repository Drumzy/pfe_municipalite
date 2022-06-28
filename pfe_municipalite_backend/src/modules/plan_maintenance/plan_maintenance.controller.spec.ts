import { Test, TestingModule } from '@nestjs/testing';
import { PlanMaintenanceController } from './plan_maintenance.controller';

describe('PlanMaintenanceController', () => {
  let controller: PlanMaintenanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanMaintenanceController],
    }).compile();

    controller = module.get<PlanMaintenanceController>(PlanMaintenanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
