import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolePayload } from '../../utils/interfaces/payload.infterface';
import { EmployeeRolesService } from './employee_roles.service';

@Controller('employee_roles')
export class EmployeeRolesController {

    constructor (private readonly rolesService: EmployeeRolesService){}

    @Get("/all")
    getAllRoles(){
        return this.rolesService.getAllRoles();
    }

    @Post('/add_role')
    async createRole(@Body() role: RolePayload){
        return this.rolesService.createEmployeeRole(role);
    }
}
