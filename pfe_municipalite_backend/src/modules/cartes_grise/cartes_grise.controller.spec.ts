import { Test, TestingModule } from '@nestjs/testing';
import { CartesGriseController } from './cartes_grise.controller';

describe('CartesGriseController', () => {
  let controller: CartesGriseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartesGriseController],
    }).compile();

    controller = module.get<CartesGriseController>(CartesGriseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
