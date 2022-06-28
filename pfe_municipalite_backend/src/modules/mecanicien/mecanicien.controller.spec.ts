import { Test, TestingModule } from '@nestjs/testing';
import { MecanicienController } from './mecanicien.controller';

describe('MecanicienController', () => {
  let controller: MecanicienController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MecanicienController],
    }).compile();

    controller = module.get<MecanicienController>(MecanicienController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
