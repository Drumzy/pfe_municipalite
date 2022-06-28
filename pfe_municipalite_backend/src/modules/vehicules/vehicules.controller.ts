import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PageDto } from '../../utils/interfaces/Pagination/page.dto';
import { PageOptionsDto } from '../../utils/interfaces/Pagination/page.options.dto';
import Vehicule from '../../models/vehicule.entity';
import { CreateVehiculeDto, UpdateVehiculeDto } from '../../utils/dtos/vehicule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt_auth.guard';
import { VehiculesService } from './vehicules.service';

@Controller('vehicules')
export class VehiculesController {

    constructor(private readonly vehiculesService: VehiculesService){}

    @Get('/all')
    getAllVehicules(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Vehicule>>{
        return this.vehiculesService.getAllVehicules(pageOptionsDto);
    }

    @Get(':id')
    getVehiculeById(@Param('id') id: string){
        return this.vehiculesService.getVehiculeById(id);
    }

    @Post('/add_vehicule')
    async createVehicule(@Body() vehicule: CreateVehiculeDto, ) {
        return this.vehiculesService.createVehicule(vehicule);
    }

    @Delete('/remove_vehicule/:id')
    async removeVehicule(@Param('id') id: string){
        return this.vehiculesService.removeVehicule(id);
    }

    @Put('/update_vehicule')
    async updateVehicule(@Body() vehicule_updates: UpdateVehiculeDto){
        return this.vehiculesService.updateVehicule(vehicule_updates);
    }
}
