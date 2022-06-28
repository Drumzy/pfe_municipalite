import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DemandeInterventionsPersonnele from '../../models/di_personnele.entity';
import { Repository } from 'typeorm';
import InterventionAttachement from '../../models/interventionAttch.entity';
import { DemandeAttachementDto, IAttachementDto } from '../../utils/dtos/files.dto';
import {v4 as uuid} from "uuid";
@Injectable()
export class InterventionsAttachementsService {

    constructor(
        @InjectRepository(InterventionAttachement) private iAttchRepository: Repository<InterventionAttachement>,
        @InjectRepository(DemandeInterventionsPersonnele) private dInterventionRepository: Repository<DemandeInterventionsPersonnele> 
    ){}

    async addDemandeInterventionAttachements(d_intervention_id: string, files: Array<Express.Multer.File>) {
        const demande_check = await this.dInterventionRepository.findOne({di_id: d_intervention_id});
        if(!demande_check){
            throw new HttpException(`Demande d'intervention avec l'id : ${d_intervention_id} n'existe pas`, HttpStatus.NOT_FOUND);
        }

        const files_to = new DemandeAttachementDto();
        files.map((file) => {
            files_to.files.push(new IAttachementDto(uuid(), file.originalname,new Date(), new Date(), file.mimetype, demande_check));
        })

        files_to.files.forEach(file => demande_check.d_intervention_attachements.push(file));
    
        await this.dInterventionRepository.save(demande_check);
    }

    async getDemandeInterventionAttachements(di_id: string){
        const demande_check = await this.dInterventionRepository.findOne({di_id: di_id});
        if(!demande_check){
            throw new HttpException(`Demande d'intervention avec l'id : ${di_id} n'existe pas`, HttpStatus.NOT_FOUND);
        }

        const files = await this.iAttchRepository.find({demande_intervention: demande_check});

        return files;
    }
}
