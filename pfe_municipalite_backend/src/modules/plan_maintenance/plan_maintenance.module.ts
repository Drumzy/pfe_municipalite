import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Mecancien from '../../models/mecancien.entity';
import PlanMaintenance from '../../models/plan_maintenance.entity';
import Vehicule from '../../models/vehicule.entity';
import { PlanMaintenanceController } from './plan_maintenance.controller';
import { PlanMaintenanceService } from './plan_maintenance.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanMaintenance,Vehicule,Mecancien])],
  controllers: [PlanMaintenanceController],
  providers: [PlanMaintenanceService]
})
export class PlanMaintenanceModule {}
