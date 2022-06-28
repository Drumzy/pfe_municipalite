import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Vehicule from '../../models/vehicule.entity';
import { Repository } from 'typeorm';
import Assurance from '../../models/assurance.entity';
import { CreateAssuranceDTO, UpdateAssuranceDTO } from '../../utils/dtos/vehicule.dto';
import { updateCleaner } from '../../utils/updateCleaner.util';

@Injectable()
export class AssurancesService {

    constructor(
        @InjectRepository(Assurance)
        private assurancesRepository: Repository<Assurance>,
        @InjectRepository(Vehicule)
        private vehiculesRepository: Repository<Vehicule>
    ){}

    async getAllAssurances(): Promise<Assurance[]>{
        const assurances: Assurance[] = await this.assurancesRepository.find();

        return assurances;
    }

    async getAssuranceByVehiculeId(vehicule_id: string){
        const vehicule_check = await this.vehiculesRepository.findOne({vehicule_id: vehicule_id});
        if(vehicule_check){
            const assurance  = await this.assurancesRepository.findOne({vehicule: vehicule_check});
            if(!assurance){
            throw new HttpException(`Assurance n'est pas trouvable`, HttpStatus.NOT_FOUND);
            }
            return assurance;
        }
        
        throw new HttpException(`Vehicule avec l'id : ${vehicule_id} n'est pas trouvable`, HttpStatus.NOT_FOUND);
        
    }

    async createAssurance(vehicule_id: string, assurance: CreateAssuranceDTO): Promise<Assurance>{
        const vehicule = await this.vehiculesRepository.findOne({vehicule_id: vehicule_id});
        if(!vehicule){
            throw new HttpException(`Vehicule witht the id : ${vehicule_id} not found`, HttpStatus.NOT_FOUND); 
        }
        assurance.vehicule = vehicule;

        const assurance_check = await this.assurancesRepository.findOne({assurance_id: assurance.assurance_id});
        if(assurance_check){
            throw new HttpException(`Assurance with the id : ${assurance.assurance_id} exists already`, HttpStatus.FOUND);
        }
        const new_assurance = await this.assurancesRepository.save(this.assurancesRepository.create(assurance));
        return new_assurance;
    }
    
    async updateAssurance(assurance_updates: UpdateAssuranceDTO){
        const assurance_check = await this.assurancesRepository.findOne({assurance_id: assurance_updates.assurance_id});
        if(!assurance_check){
            throw new HttpException(`Assurance with the id : ${assurance_updates.assurance_id} not found`, HttpStatus.NOT_FOUND);
        }
        const updated_values = updateCleaner(assurance_updates);

        const update_check = await this.assurancesRepository.update(assurance_check.assurance_id,updated_values);
        if(update_check){
            return {message: `Assurance with the id : ${assurance_updates.assurance_id} has been updated`}
        }

        throw new HttpException(`Something went wrong`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async removeAssurance(assurance_id: string){
        const assurance_check = await this.assurancesRepository.findOne({assurance_id: assurance_id});
        if(!assurance_check){
            throw new HttpException(`Assurance with the id : ${assurance_id} not found`, HttpStatus.NOT_FOUND);
        }
        const assurance_remove = await this.assurancesRepository.remove(assurance_check);
        if(assurance_remove){
            return {message: `Assurance with the id : ${assurance_id} has been removed`}
        }

        throw new HttpException(`Something went wrong`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
