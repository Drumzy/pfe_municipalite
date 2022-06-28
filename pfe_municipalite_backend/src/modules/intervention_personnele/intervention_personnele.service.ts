import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Vehicule from '../../models/vehicule.entity';
import { InterventionFilterOptionsDto } from '../../utils/interfaces/Pagination/intervention_filer.options.dto';
import { InterventionPageDto } from '../../utils/interfaces/Pagination/intervention_page.dto';
import { InterventionPageMetaDto } from '../../utils/interfaces/Pagination/intervention_page.meta.dto';
import { InterventionPageOptionsDto } from '../../utils/interfaces/Pagination/intervention_page.options.dto';
import { Repository } from 'typeorm';
import DemandeInterventionsPersonnele from '../../models/di_personnele.entity';
import { DemandeInterventionPersonneleDto } from '../../utils/dtos/d_intervention.dto';

@Injectable()
export class InterventionPersonneleService {

    constructor(
        @InjectRepository(DemandeInterventionsPersonnele)
        private interventions_personneleRepository: Repository<DemandeInterventionsPersonnele>,
        @InjectRepository(Vehicule)
        private vehiculeRepository: Repository<Vehicule>
        ){}

    async getAllInterventions(interventionPageOptionsDto: InterventionPageOptionsDto): Promise<InterventionPageDto<DemandeInterventionsPersonnele>>{
        const filterOptionsDto: InterventionFilterOptionsDto = new InterventionFilterOptionsDto(interventionPageOptionsDto.vehicule_id, interventionPageOptionsDto.status);
        const queryBuilder = this.interventions_personneleRepository.createQueryBuilder("d_interventions_personnele");
        queryBuilder
        .leftJoinAndSelect("d_interventions_personnele.vehicule","vehicule")
        .orderBy("d_interventions_personnele.date_declaration", interventionPageOptionsDto.order)
        .skip(interventionPageOptionsDto.skip)
        .take(interventionPageOptionsDto.take)
        if(filterOptionsDto.vehicule_id.length !==0){
            queryBuilder.andWhere("d_interventions_personnele.vehicule_id = :vehicule_id",{vehicule_id: filterOptionsDto.vehicule_id});
        }

        if(filterOptionsDto.status.length !== 0){
            queryBuilder.andWhere("d_interventions_personnele.status = :status", {status: filterOptionsDto.status});
        }

        const itemCount = await queryBuilder.getCount();
        const {entities} = await queryBuilder.getRawAndEntities();

        const interventionPageMetaDto = new InterventionPageMetaDto({itemCount, filterOptionsDto, interventionPageOptionsDto})
        
        return new InterventionPageDto(entities, interventionPageMetaDto);
    }

    async getDemandeIntervention(di_id: string): Promise<DemandeInterventionsPersonnele>{
        const demande_check = await this.interventions_personneleRepository.findOne({where:{di_id:di_id}, relations:["vehicule"]});
        if(!demande_check){
            throw new HttpException(`Demande d'intervention avec l'id ${di_id} n'existe pas`, HttpStatus.NOT_FOUND);
        }

        return demande_check;
    }

    async createIntervention(demandeInterventionDto: DemandeInterventionPersonneleDto){
        const vehicule_check = await this.vehiculeRepository.findOne({vehicule_id: demandeInterventionDto.vehicule.vehicule_id});
        if(!vehicule_check){
            throw new HttpException(`Vehicule avec l'id : ${demandeInterventionDto.vehicule.vehicule_id} n'existe pas `, HttpStatus.NOT_FOUND);
        }
        const demande_check = await this.interventions_personneleRepository.findOne({di_id: demandeInterventionDto.di_id});
        if(demande_check){
            throw new HttpException(`Demande avec l'id : ${demandeInterventionDto.di_id} existe déja`, HttpStatus.FOUND);
        }
        demandeInterventionDto.vehicule = vehicule_check;
        const new_demande = this.interventions_personneleRepository.create(demandeInterventionDto);
        await this.interventions_personneleRepository.save(new_demande);

        return new_demande;
    }
}
