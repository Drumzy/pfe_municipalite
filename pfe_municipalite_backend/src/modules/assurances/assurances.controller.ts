import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateAssuranceDTO, UpdateAssuranceDTO } from '../../utils/dtos/vehicule.dto';
import { AssurancesService } from './assurances.service';

@Controller('assurances')
export class AssurancesController {

    constructor(private readonly assurancesService: AssurancesService){}

    @Get('/all')
    getAllAssurances(){
        return this.assurancesService.getAllAssurances();
    }

    @Get(':id')
    getAssuranceById(@Param('id') id: string){
        return this.assurancesService.getAssuranceByVehiculeId(id);
    }

    @Post('/add_assurance/:id')
    async createAssurance(@Param('id') id: string, @Body() assurance: CreateAssuranceDTO){
        return this.assurancesService.createAssurance(id,assurance);
    }

    @Delete('/remove_assurance/:id')
    async removeAssurance(@Param('id') id: string){
        return this.assurancesService.removeAssurance(id);
    }

    @Put('/update_assurance')
    async updateAssurance(@Body() assurance_updates: UpdateAssuranceDTO){
        return this.assurancesService.updateAssurance(assurance_updates);
    }
}
