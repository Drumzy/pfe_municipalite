import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Vehicule from '../../models/vehicule.entity';
import Vignette from '../../models/vignette.entity';
import { Repository } from 'typeorm';
import { CreateVignetteDTO, UpdateVignetteDTO } from '../../utils/dtos/vehicule.dto';
import { updateCleaner } from '../../utils/updateCleaner.util';

@Injectable()
export class VignettesService {

   constructor(
        @InjectRepository(Vignette)
        private vignettesRepository: Repository<Vignette>,
        @InjectRepository(Vehicule)
        private vehiculesRepository: Repository<Vehicule>
    ){}

    async getAllVignettes(): Promise<Vignette[]>{
        const vignettes: Vignette[] = await this.vignettesRepository.find();

        return vignettes;
    }

    async getVignetteByVehiculeId(vehicule_id: string){
        const vehicule_check = await this.vehiculesRepository.findOne({vehicule_id: vehicule_id});
        if(!vehicule_check){
            throw new HttpException(`Vehicule avec id : ${vehicule_id} n'est pas trouvable`, HttpStatus.NOT_FOUND);
        }
        const vignette = await this.vignettesRepository.findOne({vehicule: vehicule_check});
        if(!vignette){
            throw new HttpException(`Vignette de vehicule avec id : ${vehicule_id} n'existe pas`, HttpStatus.NOT_FOUND);
        }
        return vignette;
    }

    async createVignette(vehicule_id: string, vignette: CreateVignetteDTO): Promise<Vignette>{
        const vehicule = await this.vehiculesRepository.findOne({vehicule_id: vehicule_id});
        if(!vehicule){
            throw new HttpException(`Vehicule witht the id : ${vehicule_id} not found`, HttpStatus.NOT_FOUND); 
        }
        vignette.vehicule = vehicule;

        const vignette_check = await this.vignettesRepository.findOne({vignette_id: vignette.vignette_id});
        if(vignette_check){
            throw new HttpException(`Assurance with the id : ${vignette.vignette_id} exists already`, HttpStatus.FOUND);
        }
        const new_vignette = await this.vignettesRepository.save(this.vignettesRepository.create(vignette));
        return new_vignette;
    }

    async updateVignette(vignette_updates: UpdateVignetteDTO){
        const vignette_check = await this.vignettesRepository.findOne({vignette_id: vignette_updates.vignette_id});
        if(!vignette_check){
            throw new HttpException(`Vignette with the id : ${vignette_updates.vignette_id} not found`, HttpStatus.NOT_FOUND);
        }

        const updated_values = updateCleaner(vignette_updates);

        const update_check = await this.vignettesRepository.update(vignette_check.vignette_id,updated_values);

        if(update_check){
            return {message: `Vignette with the id : ${vignette_updates.vignette_id} has been updated`}
        }

        throw new HttpException(`Something went wrong`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async removeVignette(vignette_id: string){
        const vignette_check = await this.vignettesRepository.findOne({vignette_id: vignette_id});
        if(!vignette_check){
            throw new HttpException(`Vignette with the id : ${vignette_id} not found`, HttpStatus.NOT_FOUND);
        }

        const vignette_remove = await this.vignettesRepository.remove(vignette_check);
        if(vignette_remove){
            return {message: `Vignette with the id : ${vignette_remove.vignette_id} has been removed`};
        }

        throw new HttpException(`Something went wrong`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
