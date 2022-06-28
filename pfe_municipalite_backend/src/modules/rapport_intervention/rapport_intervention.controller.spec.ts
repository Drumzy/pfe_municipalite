import { Test, TestingModule } from '@nestjs/testing';
import { RapportInterventionController } from './rapport_intervention.controller';

describe('RapportInterventionController', () => {
  let controller: RapportInterventionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RapportInterventionController],
    }).compile();

    controller = module.get<RapportInterventionController>(RapportInterventionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
