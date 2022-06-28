import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanMaintenanceDto } from '../../utils/dtos/plan_maintenance.dto';
import { Repository } from 'typeorm';
import PlanMaintenance from '../../models/plan_maintenance.entity';
import Vehicule from '../../models/vehicule.entity';
import Mecancien from '../../models/mecancien.entity';

@Injectable()
export class PlanMaintenanceService {

    constructor(
        @InjectRepository(PlanMaintenance)
        private planRepository: Repository<PlanMaintenance>,
        @InjectRepository(Vehicule)
        private vehiculeRepository: Repository<Vehicule>,
        @InjectRepository(Mecancien)
        private mecancienRepository: Repository<Mecancien>,
    ){}
    
    async GetAllPlans(){
        const plans = await this.planRepository.find();

        return plans;
    }

    async getPlanById (pm_id: string){
        const plan_check = await this.planRepository.findOne({
            relations:["reminders"],
            where:{pm_id:pm_id}
        });
        if(!plan_check){
            throw new HttpException(`Plan de maintenance avec id: ${pm_id} n'existe pas`, HttpStatus.NOT_FOUND);
        }

        return plan_check;
    }

    async CreatePlan(planDto: CreatePlanMaintenanceDto) {
        const plan_check = await this.planRepository.findOne({pm_id: planDto.pm_id});
        if(plan_check){
            throw new HttpException(`Plan avec id: ${planDto.pm_id} existe déja`, HttpStatus.FOUND);
        }

        const vehicule = await this.vehiculeRepository.findOne({vehicule_id:planDto.concerned_equipement});
        const mecancien = await this.mecancienRepository.findOne({mecancien_id: planDto.assigned_to});

        const plan: PlanMaintenance = new PlanMaintenance(planDto.pm_id,planDto.type,planDto.nbr_repetition,mecancien,planDto.mots_cle,planDto.periodicite,vehicule);
        
        const vehicule_insert = await this.planRepository.save(plan);

        if(!vehicule_insert){
            throw new HttpException(`Erreur lors insertion de nouveau plan`, HttpStatus.BAD_REQUEST);
        }

        return vehicule_insert;
    }

    async deletePlan (plan_id: string) {
        const plan_check = await this.planRepository.findOne({pm_id: plan_id});
        if(!plan_check) {
            throw new HttpException(`Plan avec id : ${plan_id} n'existe pas`, HttpStatus.NOT_FOUND);
        }
        const plan_remove = await this.planRepository.remove(plan_check);
        if(plan_remove){
            return {message: `Plan avec id : ${plan_id} a été supprimé`}
        }
        throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
