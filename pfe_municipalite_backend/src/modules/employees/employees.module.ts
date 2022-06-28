import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Employee from '../../models/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),],
  providers: [EmployeesService],
  controllers: [EmployeesController],
  exports: [EmployeesService,TypeOrmModule],
})
export class EmployeesModule {}
