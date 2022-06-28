import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCarteGriseDTO, UpdateCarteGriseDTO } from '../../utils/dtos/vehicule.dto';
import { CartesGriseService } from './cartes_grise.service';

@Controller('cartes_grise')
export class CartesGriseController {

    constructor(private readonly cartes_griseService: CartesGriseService){}

    @Get()
    getAllCartesGrise(){
        return this.cartes_griseService.getAllCartesGrise();
    }

    @Get(':id')
    getCarteGriseById(@Param('id') id: string){
        return this.cartes_griseService.getCarteGriseByVehiculeId(id);
    }

    @Post('/add_carte_grise/:id')
    async createCarteGrise(@Param('id') id: string, @Body() carte_grise: CreateCarteGriseDTO){
        return this.cartes_griseService.createCarteGrise(id, carte_grise);
    }
    
    @Delete('/remove_carte_grise/:id')
    async removeCarteGrise(@Param('id') id: string){
        return this.cartes_griseService.removeCarteGrise(id);
    }

    @Put('/update_carte_grise')
    async updateCarteGrise(@Body() carte_grise_updates: UpdateCarteGriseDTO){
        return this.cartes_griseService.updateCarteGrise(carte_grise_updates);
    }
}
