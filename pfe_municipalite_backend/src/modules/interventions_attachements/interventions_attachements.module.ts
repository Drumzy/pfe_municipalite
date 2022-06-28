import { Module } from '@nestjs/common';
import { InterventionsAttachementsController } from './interventions_attachements.controller';
import { InterventionsAttachementsService } from './interventions_attachements.service';

@Module({
  controllers: [InterventionsAttachementsController],
  providers: [InterventionsAttachementsService]
})
export class InterventionsAttachementsModule {}
