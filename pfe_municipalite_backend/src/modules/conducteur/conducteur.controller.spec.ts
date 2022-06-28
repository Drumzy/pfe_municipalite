import { Test, TestingModule } from '@nestjs/testing';
import { ConducteurController } from './conducteur.controller';
describe('ConducteurController', () => {
  let controller: ConducteurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConducteurController],
    }).compile();

    controller = module.get<ConducteurController>(ConducteurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
