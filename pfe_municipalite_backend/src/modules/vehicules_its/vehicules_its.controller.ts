import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { CreateVehiculeInfoTechniqueDTO, UpdateVehiculeInfoTechniqueDTO } from '../../utils/dtos/vehicule.dto';
import { VehiculesItsService } from './vehicules_its.service';

@Controller('vehicules_its')
export class VehiculesItsController {

    constructor(
    private readonly vehiculesitsService: VehiculesItsService, 
    ){}
    @Get('/all')
    getAllVehiculesIt(){
        return this.vehiculesitsService.getAllVehiculesIts();
    }

    @Get(':id')
    getVehiculeItById(@Param('id') id: string){
        return this.vehiculesitsService.getVehiculeItByVehiculeId(id);
    }

    @Post('/add_vehicule_it/:id')
    async createVehiculeIt(@Param('id') id: string,@Body() vehicule_it: CreateVehiculeInfoTechniqueDTO){
        return this.vehiculesitsService.createVehiculeIt(id,vehicule_it);
    }

    @Delete('/remove_vehicule_it/:id')
    async removeVehiculeIt(@Param('id') id: string){
        return this.vehiculesitsService.removeVehiculeIt(id);
    }

    @Put('/update_vehicule_it')
    async updateVehiculeIt(@Body() vehicule_it_updates: UpdateVehiculeInfoTechniqueDTO){
        return this.vehiculesitsService.updateVehiculeIt(vehicule_it_updates);
    }
}
