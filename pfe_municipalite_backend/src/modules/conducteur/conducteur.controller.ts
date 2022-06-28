import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  CreateEmployeeDto,
  UpdateEmployeeDTO,
} from '../../utils/dtos/employee.dto';
import {
  CreateConducteurDto,
  UpdateConducteurDto,
} from 'src/utils/dtos/conducteur.dto';
import { ConducteurService } from './conducteur.service';

@Controller('conducteur')
export class ConducteurController {
  constructor(private readonly conducteurService: ConducteurService) {}

  @Get('/all')
  async getAllMConducteur() {
    return this.conducteurService.getAllConducteur();
  }

  @Get(':id')
  async getConducteurById(@Param('id') id: string) {
    return this.conducteurService.getConducteurById(id);
  }

  @Post('/add_conducteur')
  async createConducteur(
    @Body('employee') employee: CreateEmployeeDto,
    @Body('conducteur') conducteur: CreateConducteurDto,
  ) {
    return this.conducteurService.createConducteur(employee, conducteur);
  }

  @Patch('/update_conducteur')
  async updateConducteur(
    @Body() employee_updates: UpdateEmployeeDTO,
    conducteur_updates: UpdateConducteurDto,
  ) {
    return this.conducteurService.updateConducteur(
      employee_updates,
      conducteur_updates,
    );
  }
}
