import { Test, TestingModule } from '@nestjs/testing';
import { InterventionPersonneleController } from './intervention_personnele.controller';

describe('InterventionPersonneleController', () => {
  let controller: InterventionPersonneleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterventionPersonneleController],
    }).compile();

    controller = module.get<InterventionPersonneleController>(InterventionPersonneleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
