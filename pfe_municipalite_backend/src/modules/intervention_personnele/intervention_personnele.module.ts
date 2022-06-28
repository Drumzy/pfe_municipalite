import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DemandeInterventionsPersonnele from '../../models/di_personnele.entity';
import Vehicule from '../../models/vehicule.entity';
import { InterventionPersonneleController } from './intervention_personnele.controller';
import { InterventionPersonneleService } from './intervention_personnele.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemandeInterventionsPersonnele, Vehicule])],
  controllers: [InterventionPersonneleController],
  providers: [InterventionPersonneleService]
})
export class InterventionPersonneleModule {}
