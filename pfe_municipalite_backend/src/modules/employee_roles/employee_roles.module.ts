import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EmployeeTypes from '../../models/employee_types.entity';
import { EmployeeRolesController } from './employee_roles.controller';
import { EmployeeRolesService } from './employee_roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeTypes])],
  controllers: [EmployeeRolesController],
  providers: [EmployeeRolesService]
})
export class EmployeeRolesModule {}
