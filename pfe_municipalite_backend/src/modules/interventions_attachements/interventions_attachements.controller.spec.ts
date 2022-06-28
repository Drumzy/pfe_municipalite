import { Test, TestingModule } from '@nestjs/testing';
import { InterventionsAttachementsController } from './interventions_attachements.controller';

describe('InterventionsAttachementsController', () => {
  let controller: InterventionsAttachementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterventionsAttachementsController],
    }).compile();

    controller = module.get<InterventionsAttachementsController>(InterventionsAttachementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
