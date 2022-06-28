import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Vehicule from '../../models/vehicule.entity';
import VehiculeAttachement from '../../models/vehiculeAttch.entity';
import { VehiculeAttachementsController } from './vehicule_attachements.controller';
import { VehiculeAttachementsService } from './vehicule_attachements.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehiculeAttachement,Vehicule])],
  controllers: [VehiculeAttachementsController],
  providers: [VehiculeAttachementsService]
})
export class VehiculeAttachementsModule {}
