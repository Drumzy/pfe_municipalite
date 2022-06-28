import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EmployeeTypes from '../../models/employee_types.entity';
import Mecancien from '../../models/mecancien.entity';
import { EmployeesModule } from '../employees/employees.module';
import { MecanicienController } from './mecanicien.controller';
import { MecanicienService } from './mecanicien.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mecancien, EmployeeTypes]), EmployeesModule],
  controllers: [MecanicienController],
  providers: [MecanicienService]
})
export class MecanicienModule {}
