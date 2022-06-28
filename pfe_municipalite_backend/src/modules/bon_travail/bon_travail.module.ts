import { Module } from '@nestjs/common';
import { BonTravailService } from './bon_travail.service';
import { BonTravailController } from './bon_travail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import BonTravail from '../../models/bon_travail.entity';
import Mecancien from '../../models/mecancien.entity';
import DemandeInterventionsPersonnele from '../../models/di_personnele.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BonTravail,Mecancien,DemandeInterventionsPersonnele])],
  providers: [BonTravailService],
  controllers: [BonTravailController]
})
export class BonTravailModule {}
