import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from '../../utils/enums/employeRole.enum';
import { CreateEmployeeDto, UpdateEmployeeDTO } from '../../utils/dtos/employee.dto';
import { CreateGestionnaireParcDTO, UpdateGestionnaireParcDTO } from '../../utils/dtos/gestionnaire_parc.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { GestionnaireParcService } from './gestionnaire_parc.service';
import { JwtAuthGuard } from '../auth/guards/jwt_auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('gestionnaire_parc')
export class GestionnaireParcController {
    constructor(private readonly gestionnairesService: GestionnaireParcService){}

    @Get()
    async getAllGestionnaires(){
        return this.gestionnairesService.getAllGestionnaires();
    }
    
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getGestionnaireById(@Param('id') id: string){
        return this.gestionnairesService.GetGestionnaireById(id);
    }

    @Post('/add_gestionnaire')
    async createGestionnaire(@Body('employee') employee: CreateEmployeeDto, @Body('gestionnaire') gestionnaire: CreateGestionnaireParcDTO){
        return this.gestionnairesService.createGestionnaire(employee,gestionnaire);
    }

    @Patch('/update_gestionnaire')
    async updateGestionnaire(@Body() employee_updates: UpdateEmployeeDTO,gestionnaire_updates: UpdateGestionnaireParcDTO){
        return this.gestionnairesService.updateGestionnaire(employee_updates,gestionnaire_updates);
    }
}
