import { Test, TestingModule } from '@nestjs/testing';
import { BonTravailController } from './bon_travail.controller';

describe('BonTravailController', () => {
  let controller: BonTravailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BonTravailController],
    }).compile();

    controller = module.get<BonTravailController>(BonTravailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
