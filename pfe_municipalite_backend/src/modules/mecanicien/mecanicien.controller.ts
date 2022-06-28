import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  CreateEmployeeDto,
  UpdateEmployeeDTO,
} from '../../utils/dtos/employee.dto';
import {
  CreateMecanicienDto,
  UpdateMecanicienDto,
} from '../../utils/dtos/mecanicien.dto';
import { MecanicienService } from './mecanicien.service';

@Controller('mecanicien')
export class MecanicienController {
  constructor(private readonly mecanicienService: MecanicienService) {}

  @Get('/all')
  async getAllMecancien() {
    return this.mecanicienService.getAllMecaniciens();
  }

  @Get(':id')
  async getMecancienById(@Param('id') id: string) {
    return this.mecanicienService.getMecanicienById(id);
  }

  @Post('/add_mecanicien')
  async createMecanicien(
    @Body('employee') employee: CreateEmployeeDto,
    @Body('mecanicien') mecanicien: CreateMecanicienDto,
  ) {
    return this.mecanicienService.createMecanicien(employee, mecanicien);
  }

  @Patch('/update_mecanicien')
  async updateMecanicien(
    @Body() employee_updates: UpdateEmployeeDTO,
    mecanicien_updates: UpdateMecanicienDto,
  ) {
    return this.mecanicienService.updateMecanicien(
      employee_updates,
      mecanicien_updates,
    );
  }
}
