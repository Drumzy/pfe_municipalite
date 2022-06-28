import { Test, TestingModule } from '@nestjs/testing';
import { VehiculeAttachementsController } from './vehicule_attachements.controller';

describe('VehiculeAttachementsController', () => {
  let controller: VehiculeAttachementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiculeAttachementsController],
    }).compile();

    controller = module.get<VehiculeAttachementsController>(VehiculeAttachementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
