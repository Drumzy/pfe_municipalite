import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateVignetteDTO, UpdateVignetteDTO } from '../../utils/dtos/vehicule.dto';
import { VignettesService } from './vignettes.service';

@Controller('vignettes')
export class VignettesController {

    constructor(private readonly vignettesService: VignettesService){}

    @Get('/all')
    getAllVignettes(){
        return this.vignettesService.getAllVignettes();
    }

    @Get(':id')
    getVignetteById(@Param('id') id: string){
        return this.vignettesService.getVignetteByVehiculeId(id);
    }

    @Post('/add_vignette/:id')
    async createVignette(@Param('id') id: string, @Body() vignette: CreateVignetteDTO){
        return this.vignettesService.createVignette(id,vignette);
    }

    @Delete('/remove_vignette/:id')
    async removeVignette(@Param('id') id: string){
        return this.vignettesService.removeVignette(id);
    }

    @Put('/update_vignette')
    async updateVignette(@Body() vignette_updates: UpdateVignetteDTO){
        return this.vignettesService.updateVignette(vignette_updates);
    }
}
