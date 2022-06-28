import { Module } from '@nestjs/common';
import { GestionnaireParcService } from './gestionnaire_parc.service';
import { GestionnaireParcController } from './gestionnaire_parc.controller';
import { EmployeesModule } from '../employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import GestionnaireParc from '../../models/gestionnaire_parc.entity';
import EmployeeTypes from '../../models/employee_types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GestionnaireParc, EmployeeTypes]),EmployeesModule],
  providers: [GestionnaireParcService],
  controllers: [GestionnaireParcController]
})
export class GestionnaireParcModule {}
