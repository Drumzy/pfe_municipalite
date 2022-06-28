import { Test, TestingModule } from '@nestjs/testing';
import { GestionnaireParcController } from './gestionnaire_parc.controller';

describe('GestionnaireParcController', () => {
  let controller: GestionnaireParcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionnaireParcController],
    }).compile();

    controller = module.get<GestionnaireParcController>(GestionnaireParcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
