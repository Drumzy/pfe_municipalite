import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { UpdateEmployeeDTO } from 'src/utils/dtos/employee.dto';
import { EmployeePageOptionsDto } from '../../utils/interfaces/Pagination/employee.page.options.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
    constructor( private readonly employeeService: EmployeesService){}

    @Get('/all')
    async getAllEmployees(@Query() employee_pageOptionsDto: EmployeePageOptionsDto){
        return this.employeeService.getAllEmployees(employee_pageOptionsDto);
    }

    @Get(':id')
    async getEmployeeById(@Param('id') id: string){
        return this.employeeService.getEmployeeById(id);
    }
    
    @Put('/update_employee')
    async EditProfile(@Body() employee_updates: UpdateEmployeeDTO){
        return this.employeeService.updateEmployee(employee_updates);
    }
    
    @Delete('/remove_employee/:id')
    async removeEmployee(@Param('id') id: string){
        return this.employeeService.removeEmployee(id);
    }
}
