export class VehiculesStatusDto {
    active: number;
    broken_down: number;
    out_of_order: number;
    active_ratio: number;
    broken_down_ratio: number;
    out_of_order_ratio:number;
    constructor(active: number, broken_down: number, out_of_order: number){
        this.active = active;
        this.broken_down = broken_down;
        this.out_of_order = out_of_order
    }
}

export class VehiculesStatusTypeDto {
    camion : number;
    tracteur: number;
    voiture: number;
    pick_up: number;
    camion_ratio : number;
    tracteur_ratio: number;
    voiture_ratio: number;
    pick_up_ratio: number;
    constructor(camion: number, tracteur: number, voiture: number, pick_up: number){
        this.camion = camion;
        this.tracteur = tracteur;
        this.voiture = voiture;
        this.pick_up = pick_up
    }
}
export class VehiculesStatusServiceDto {
    nettoyage : number;
    chantier: number;
    transport: number;
    nettoyage_ratio : number;
    chantier_ratio: number;
    transport_ratio: number;
    constructor(nettoyage: number, chantier: number, transport: number){
        this.nettoyage = nettoyage;
        this.chantier = chantier;
        this.transport = transport;
    }
}

export class VehiculeStatusMissingDocumentsDto{
    missing_assurance: number;
    missing_carte_grise: number;
    missing_vignette:number;
    missing_vehicue_it:number;
    missing_assurance_ratio: number;
    missing_carte_grise_ratio: number;
    missing_vignette_ratio:number;
    missing_vehicue_it_ratio:number;

    constructor(missing_assurance:number,missing_carte_grise:number,missing_vignette:number,missing_vehicue_it:number){
        this.missing_assurance = missing_assurance;
        this.missing_carte_grise = missing_carte_grise;
        this.missing_vignette = missing_vignette;
        this.missing_vehicue_it = missing_vehicue_it;
    }
}