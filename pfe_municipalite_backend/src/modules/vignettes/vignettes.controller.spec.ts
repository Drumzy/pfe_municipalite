import { Test, TestingModule } from '@nestjs/testing';
import { VignettesController } from './vignettes.controller';

describe('VignettesController', () => {
  let controller: VignettesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VignettesController],
    }).compile();

    controller = module.get<VignettesController>(VignettesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
