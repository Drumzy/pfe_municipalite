import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Vehicule from '../../models/vehicule.entity';
import { Repository } from 'typeorm';
import { VehiculesStatusDto, VehiculesStatusServiceDto, VehiculesStatusTypeDto, VehiculeStatusMissingDocumentsDto } from '../../utils/dtos/statistics.dto';

@Injectable()
export class StatisticsService {

    constructor(
        @InjectRepository(Vehicule)
        private vehiculeRepository: Repository<Vehicule>,
    ){}

    async getVehiculesStatus(){
        const queryBuilder = this.vehiculeRepository.createQueryBuilder("vehicules");
        const vehiculesStatus = new VehiculesStatusDto(0,0,0);
        const itemCount = await queryBuilder.getCount();
        const {entities} = await queryBuilder.getRawAndEntities();
        entities.forEach((vehicule) =>{
            if(vehicule.status === "Active"){
                vehiculesStatus.active += 1;
            }
            if(vehicule.status === "En Panne"){
                vehiculesStatus.broken_down += 1;
            }
            if(vehicule.status === "Hors Serivce"){
                vehiculesStatus.out_of_order += 1;
            }
        })
        vehiculesStatus.active_ratio = (100 * vehiculesStatus.active) / itemCount;
        vehiculesStatus.broken_down_ratio = (100 * vehiculesStatus.broken_down) / itemCount;
        vehiculesStatus.out_of_order_ratio = (100 * vehiculesStatus.out_of_order) / itemCount;
        return {itemCount, vehiculesStatus};
    }

    async getVehiculesByType(){
        const queryBuilder = this.vehiculeRepository.createQueryBuilder("vehicules");
        const vehicuelsStatusType = new VehiculesStatusTypeDto(0,0,0,0);
        const itemCount = await queryBuilder.getCount();
        const {entities} = await queryBuilder.getRawAndEntities();
        entities.forEach((vehicule) => {
            switch(vehicule.type){
                case "Camion": vehicuelsStatusType.camion += 1;break;
                case "Tracteur": vehicuelsStatusType.tracteur += 1;break;
                case "Voiture": vehicuelsStatusType.voiture += 1;break;
                case "Pick-up": vehicuelsStatusType.pick_up += 1;break;
            }
        });

        vehicuelsStatusType.camion_ratio = (100 * vehicuelsStatusType.camion) / itemCount;
        vehicuelsStatusType.tracteur_ratio = (100 * vehicuelsStatusType.tracteur) / itemCount;
        vehicuelsStatusType.voiture_ratio = (100 * vehicuelsStatusType.voiture) / itemCount;
        vehicuelsStatusType.pick_up_ratio = (100 * vehicuelsStatusType.pick_up) / itemCount;
    
        return {itemCount, vehicuelsStatusType};
    }

    async getVehiculesBySerivce(){
        const queryBuilder = this.vehiculeRepository.createQueryBuilder("vehicules");
        const vehicuelsStatusService = new VehiculesStatusServiceDto(0,0,0);
        const itemCount = await queryBuilder.getCount();
        const {entities} = await queryBuilder.getRawAndEntities();
        entities.forEach((vehicule) => {
            switch(vehicule.service){
                case "Chantier": vehicuelsStatusService.chantier += 1;break;
                case "Nettoyage": vehicuelsStatusService.nettoyage += 1;break;
                case "Transport": vehicuelsStatusService.transport += 1;break;
            }
        });

        vehicuelsStatusService.chantier_ratio = (100 * vehicuelsStatusService.chantier) / itemCount;
        vehicuelsStatusService.nettoyage_ratio = (100 * vehicuelsStatusService.nettoyage) / itemCount;
        vehicuelsStatusService.transport_ratio = (100 * vehicuelsStatusService.transport) / itemCount;
    
        return {itemCount, vehicuelsStatusService};
    }

    async getVehiculesStatsMissingDocuments (){
        const queryBuilder = this.vehiculeRepository.createQueryBuilder("vehicules");
        const vehiculeStatusMissingDocuments = new VehiculeStatusMissingDocumentsDto(0,0,0,0);
        queryBuilder
        .leftJoinAndSelect("vehicules.carte_grise", "carte_grise")
        .leftJoinAndSelect("vehicules.assurance", "assurance")
        .leftJoinAndSelect("vehicules.vignette","vignette")
        .leftJoinAndSelect("vehicules.vehicule_it","vehicule_it");

        const itemCount = await queryBuilder.getCount();
        const {entities} = await queryBuilder.getRawAndEntities();
        
        entities.forEach((vehicule) => {
            if(vehicule.carte_grise === null){
                vehiculeStatusMissingDocuments.missing_carte_grise += 1;
            }
            
            if(vehicule.assurance === null){
                vehiculeStatusMissingDocuments.missing_assurance += 1;
            }

            if(vehicule.vignette === null){
                vehiculeStatusMissingDocuments.missing_vignette += 1;
            }

            if(vehicule.vehicule_it === null){
                vehiculeStatusMissingDocuments.missing_vehicue_it += 1;
            }
        })

        vehiculeStatusMissingDocuments.missing_assurance_ratio = (100 * vehiculeStatusMissingDocuments.missing_assurance) /itemCount;
        vehiculeStatusMissingDocuments.missing_carte_grise_ratio = (100 * vehiculeStatusMissingDocuments.missing_carte_grise) /itemCount;
        vehiculeStatusMissingDocuments.missing_vehicue_it_ratio = (100 * vehiculeStatusMissingDocuments.missing_vehicue_it) /itemCount;
        vehiculeStatusMissingDocuments.missing_vignette_ratio = (100 * vehiculeStatusMissingDocuments.missing_vignette) /itemCount;
        return {itemCount, vehiculeStatusMissingDocuments};
    }

    
}
