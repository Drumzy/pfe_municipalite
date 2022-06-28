import { Test, TestingModule } from '@nestjs/testing';
import { VehiculesItsController } from './vehicules_its.controller';

describe('VehiculesItsController', () => {
  let controller: VehiculesItsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiculesItsController],
    }).compile();

    controller = module.get<VehiculesItsController>(VehiculesItsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
