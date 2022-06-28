import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Vehicule from '../../models/vehicule.entity';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicule])],
  controllers: [StatisticsController],
  providers: [StatisticsService]
})
export class StatisticsModule {}
