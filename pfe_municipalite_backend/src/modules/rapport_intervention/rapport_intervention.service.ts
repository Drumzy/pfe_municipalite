import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Causes from '../../models/causes.entity';
import Defauts from '../../models/defauts.entity';
import Notes from '../../models/notes.entity';
import RapportIntervention from '../../models/rapport_intervention.entity';
import Reparations from '../../models/reparations.entity';
import { CreateRapportDto } from '../../utils/dtos/rapport_intervention.dto';
import { Repository } from 'typeorm';
import BonTravail from '../../models/bon_travail.entity';

@Injectable()
export class RapportInterventionService {

    constructor(
        @InjectRepository(RapportIntervention)
        private rapportRepository: Repository<RapportIntervention>,
        @InjectRepository(Defauts)
        private defautRepository: Repository<Defauts>,
        @InjectRepository(Causes)
        private causeRepository: Repository<Causes>,
        @InjectRepository(Reparations)
        private reparationRepository: Repository<Reparations>,
        @InjectRepository(Notes)
        private noteRepository: Repository<Notes>,
        @InjectRepository(BonTravail)
        private btRepository: Repository<BonTravail>
    ){}

    async createRapport (rapportDto: CreateRapportDto) {
        const rapport_check = await this.rapportRepository.findOne({ri_id: rapportDto.ri_id});
        if(rapport_check){
            throw new HttpException(`Rapport avec l'id : ${rapportDto.ri_id} existe déja`, HttpStatus.FOUND);
        }
        const bon_travail_check = await this.btRepository.findOne({bt_id: rapportDto.bt_id});
         if(!bon_travail_check){
             throw new HttpException(`Aucun bon de travail est liée a ce rapport`, HttpStatus.NOT_FOUND);
         }
         bon_travail_check.n_travail = "empty";
         Object.assign(rapportDto,{bon_travail: bon_travail_check});
         console.log(rapportDto)
         return await this.rapportRepository.save(this.rapportRepository.create(rapportDto));
    }
}
