import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Assurance from '../../models/assurance.entity';
import { VehiculesModule } from '../vehicules/vehicules.module';
import { AssurancesController } from './assurances.controller';
import { AssurancesService } from './assurances.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assurance]),VehiculesModule],
  controllers: [AssurancesController],
  providers: [AssurancesService]
})
export class AssurancesModule {}
