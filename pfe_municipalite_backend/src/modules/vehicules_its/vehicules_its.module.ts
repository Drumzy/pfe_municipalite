import { Module } from '@nestjs/common';
import { VehiculesItsService } from './vehicules_its.service';
import { VehiculesItsController } from './vehicules_its.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import VehiculeIT from '../../models/vehiculeIT.entity';
import { VehiculesModule } from '../vehicules/vehicules.module';

@Module({
  imports: [TypeOrmModule.forFeature([VehiculeIT]),VehiculesModule],
  providers: [VehiculesItsService],
  controllers: [VehiculesItsController]
})
export class VehiculesItsModule {}
