import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CarteGrise from '../../models/carte_grise.entity';
import Vehicule from '../../models/vehicule.entity';
import { Repository } from 'typeorm';
import { CreateCarteGriseDTO, UpdateCarteGriseDTO } from '../../utils/dtos/vehicule.dto';
import { updateCleaner } from '../../utils/updateCleaner.util';

@Injectable()
export class CartesGriseService {

    constructor(
        @InjectRepository(CarteGrise)
        private cartes_griseRepository: Repository<CarteGrise>,
        @InjectRepository(Vehicule)
        private vehiculesRepository: Repository<Vehicule>
        ){}

        async getAllCartesGrise(): Promise<CarteGrise[]>{
            const cartes_grise = await this.cartes_griseRepository.find();

            return cartes_grise;
        }

        async getCarteGriseByVehiculeId(vehicule_id: string){
            const vehicule_check = await this.vehiculesRepository.findOne({vehicule_id:vehicule_id});
            if(vehicule_check){
                const carte_grise = await this.cartes_griseRepository.findOne({vehicule: vehicule_check});
                if(!carte_grise){
                throw new HttpException(`Carte grise with the id : ${carte_grise.carte_grise_id} already exists`, HttpStatus.FOUND);
                }
                 return carte_grise
            }
            
            return new HttpException(`Vehicule avec l'id : ${vehicule_id} n'est pas trouvable`, HttpStatus.NOT_FOUND);

        }
        async createCarteGrise(vehicule_id: string, carte_grise: CreateCarteGriseDTO): Promise<CarteGrise>{
            const vehicule = await  this.vehiculesRepository.findOne({vehicule_id: vehicule_id});
            if(!vehicule){
                throw new HttpException(`Vehicule with the id : ${vehicule_id} not found `, HttpStatus.NOT_FOUND);
            }

            carte_grise.vehicule = vehicule;

            const carte_grise_check = await this.cartes_griseRepository.findOne({carte_grise_id: carte_grise.carte_grise_id});
            if(carte_grise_check){
                throw new HttpException(`Carte grise with the id : ${carte_grise.carte_grise_id} already exists`, HttpStatus.FOUND);
            }
            const new_carte_grise = await this.cartes_griseRepository.save(this.cartes_griseRepository.create(carte_grise));

            return new_carte_grise;
        }

        async updateCarteGrise(carte_grise_updates: UpdateCarteGriseDTO){
            const carte_grise_check = await this.cartes_griseRepository.findOne({carte_grise_id: carte_grise_updates.carte_grise_id});
        if(!carte_grise_check){
            throw new HttpException(`Carte grise with the id : ${carte_grise_updates.carte_grise_id} not found`, HttpStatus.NOT_FOUND);
        }
        const updated_values = updateCleaner(carte_grise_updates);
        
        const update_check = await this.cartes_griseRepository.update(carte_grise_check.carte_grise_id,updated_values);
        if(update_check){
            return {message: `Carte grise with the id : ${carte_grise_updates.carte_grise_id} has been updated`}
        }
        
        throw new HttpException(`Something went wrong`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        async removeCarteGrise(carte_grise_id: string){
            const carte_grise_check = await this.cartes_griseRepository.findOne({carte_grise_id: carte_grise_id});
        if(!carte_grise_check){
            throw new HttpException(`Vehicule with the id : ${carte_grise_id} not found`, HttpStatus.NOT_FOUND);
        }
        const carte_grise_remove = await this.cartes_griseRepository.remove(carte_grise_check);
        if(carte_grise_remove){
            return {message: `Carte grise with the id : ${carte_grise_id} has been removed`}
        }

        throw new HttpException(`Something went wrong`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}
