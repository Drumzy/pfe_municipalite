import Conducteur from "../../models/conducteur.entity";
import Vehicule from "../../models/vehicule.entity";
import VehiculeAttachement from "../../models/vehiculeAttch.entity";

export class CreateVehiculeDto {
    vehicule_id: string;
    immatriculation: string;
    num_chassis: string;
    status: string;
    type:string;
    conducteurs: Conducteur[];
    service: string;
    benne: boolean;
    attachements: VehiculeAttachement[]; 
}

export class UpdateVehiculeDto{
    vehicule_id: string;
    immatriculation: string;
    num_chassis: string;
    status: string;
    type:string;
    service: string;
    benne: string;
    attachements: VehiculeAttachement[]; 
}

export class CreateVehiculeInfoTechniqueDTO{
    vit_id: string;
    vehicule: Vehicule;
    motorisation: string;
    pf: number;
    moteur: string;
    volume_reservoire: number;
    marque: string;
    modele: string;
}

export class UpdateVehiculeInfoTechniqueDTO{
    vit_id: string;
    motorisation: string;
    pf: number;
    moteur: string;
    volume_reservoire: number;
    marque: string;
    modele: string;
}

export class CreateAssuranceDTO{
    assurance_id: string;
    numero: number;
    nom_agence: string;
    date_debut: Date;
    date_fin: Date;
    attachement: string;
    vehicule:Vehicule;
}
export class UpdateAssuranceDTO{
    assurance_id: string;
    numero: number;
    nom_agence: string;
    date_debut: Date;
    date_fin: Date;
    attachement: string;
}
export class CreateCarteGriseDTO{
    carte_grise_id: string;
    adresse: string;
    matricule_fiscale: string;
    activite: string;
    genre: string;
    num_serie_type: string;
    date_mise_circulation: string;
    attachement: string;
    vehicule: Vehicule;
}

export class UpdateCarteGriseDTO{
    carte_grise_id: string;
    adresse: string;
    matricule_fiscale: string;
    activite: string;
    genre: string;
    num_serie_type: string;
    date_mise_circulation: string;
    attachement: string;
}

export class CreateVignetteDTO{
    vignette_id: string;
    num_quittance: string;
    date_debut: Date;
    date_fin: Date;
    prix: number;
    attachement: string;
    vehicule: Vehicule;
}

export class UpdateVignetteDTO{
    vignette_id: string;
    num_quittance: string;
    date_debut: Date;
    date_fin: Date;
    prix: number;
    attachement: string;
}