import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EmployeeTypes from '../../models/employee_types.entity';
import Conducteur from 'src/models/conducteur.entity';
import { EmployeesModule } from '../employees/employees.module';
import { ConducteurController } from './conducteur.controller';
import { ConducteurService } from './conducteur.service';


@Module({
  imports: [TypeOrmModule.forFeature([Conducteur, EmployeeTypes]), EmployeesModule],
  controllers: [ConducteurController],
  providers: [ConducteurService]
})
export class ConducteurModule {}
