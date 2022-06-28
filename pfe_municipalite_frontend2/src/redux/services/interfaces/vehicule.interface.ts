export interface Vehicule {
  vehicule_id: string;
  immatriculation: string;
  num_chassis: string;
  type: string;
  service: string;
  benne: boolean;
  status: string;
  attachements:{categories:string,creer_le:string,file_name:string,maj_le:string,type:string,vha_id:string}[]
}
export interface InformationTechnique {
  vit_id: string;
  motorisation: string;
  pf: number;
  moteur: string;
  volume_reservoire: number;
  marque: string;
  modele: string;
}
export interface Assurance {
  assurance_id: string;
  nom_agence: string;
  date_debut: Date;
  date_fin: Date;
  attachement: string;
}

export interface CarteGrise {
  carte_grise_id: string;
  adresse: string;
  matricule_fiscale: string;
  activite: string;
  genre: string;
  num_serie_type: string;
  attachement: string;
  vehicule_id: string;
  date_mise_circulation: Date;
}

export interface Vignette {
  vignette_id: string;
  num_quittance: string;
  date_debut: Date;
  date_fin: Date;
  prix: number;
  attachement: string;
  vehicule_id: string;
}

export interface vehiculeItPayload {
  vehicule_id: string;
  vehicule_it: InformationTechnique;
}

export interface assurancePayload {
  vehicule_id: string;
  assurance: Assurance;
}
export interface carte_grisePayload {
  vehicule_id: string;
  carte_grise: CarteGrise;
}
export interface vignettePayload {
  vehicule_id: string;
  vignette: Vignette;
}

export interface PageMetaDto {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
}

export type VehiculeResponse = {
  data: Vehicule[];
  meta: PageMetaDto;
};

export interface FilterOptionsDto {
  type: string;
  status: string;
  service: string;
}

export interface FileUploadDto {
  vehicule_id: string | undefined;
  files: FormData;
  categories:string;
}


