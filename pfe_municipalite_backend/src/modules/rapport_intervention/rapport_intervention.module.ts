import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BonTravail from '../../models/bon_travail.entity';
import Causes from '../../models/causes.entity';
import Defauts from '../../models/defauts.entity';
import Notes from '../../models/notes.entity';
import RapportIntervention from '../../models/rapport_intervention.entity';
import Reparations from '../../models/reparations.entity';
import { RapportInterventionController } from './rapport_intervention.controller';
import { RapportInterventionService } from './rapport_intervention.service';

@Module({
  imports: [TypeOrmModule.forFeature([RapportIntervention,Notes,Causes,Defauts,Reparations,BonTravail])],
  controllers: [RapportInterventionController],
  providers: [RapportInterventionService]
})
export class RapportInterventionModule {}
