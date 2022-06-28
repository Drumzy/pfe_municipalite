import {DemandeInterventionPersonnele, DemandeInterventionPersonnele2} from "./intervention.interface";
import { Mecanicien, PageMetaDto } from "./user.interface";

export interface CreateBonTravailDto {
    bt_id: string;
    date: Date;
    demandeur: string;
    equipement: string;
    n_travail: string;
    usedEquipements: string[];
    selected_mecaniciens: string[];
    ouvriers: Mecanicien[];
    demandes: DemandeInterventionPersonnele2[];
}

export interface RapportIntervention{
    ri_id: string;
    causes: {id:number, name:string, di_id: string}[];
    reparations: {id:number, name:string, di_id: string}[]
    notes: {id:number, name:string, di_id: string}[]
}
export interface BonTravail {
    bt_id: string;
    date: string;
    demandeur: string;
    equipement: string;
    n_travail: string;
    usedEquipements: string;
    ouvries: Mecanicien[];
    demandes: DemandeInterventionPersonnele2[];
    rapport_intervention: RapportIntervention;
}
export type BonTravailResponse = {
    data: BonTravail[],
    meta: PageMetaDto;
}


export interface CreateRapportDto {
    ri_id: string;
    bt_id: string;
    causes:{name:string,active:boolean,key:string}[];
    reparations:{name:string,active:boolean,key:string}[];
    notes:{name:string,active:boolean,key:string}[];
}