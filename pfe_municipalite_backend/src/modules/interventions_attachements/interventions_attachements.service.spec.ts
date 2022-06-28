import { Test, TestingModule } from '@nestjs/testing';
import { InterventionsAttachementsService } from './interventions_attachements.service';

describe('InterventionsAttachementsService', () => {
  let service: InterventionsAttachementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterventionsAttachementsService],
    }).compile();

    service = module.get<InterventionsAttachementsService>(InterventionsAttachementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
