import DemandeInterventionsPersonnele from '../../models/di_personnele.entity';
import Vehicule from '../../models/vehicule.entity';

export class AttachementDto {
  constructor(
    vha_id: string,
    file_name: string,
    cree_le: Date,
    maj_le: Date,
    type: string,
    vehicule: Vehicule,
    categories: string,
  ) {
    this.vha_id = vha_id;
    this.file_name = file_name;
    this.creer_le = cree_le;
    this.maj_le = maj_le;
    this.type = type;
    this.vehicule = vehicule;
    this.categories = categories;
  }

  vha_id: string;
  file_name: string;
  creer_le: Date;
  maj_le: Date;
  type: string;
  categories: string;
  vehicule: Vehicule;
}

export class AttachementsDto {
  constructor() {
    this.files = [];
  }
  files: AttachementDto[];
}

export class IAttachementDto {
  constructor(
    ia_id: string,
    file_name: string,
    cree_le: Date,
    maj_le: Date,
    type: string,
    demande_intervention: DemandeInterventionsPersonnele,
  ) {
    this.ia_id = ia_id;
    this.file_name = file_name;
    this.creer_le = cree_le;
    this.maj_le = maj_le;
    this.type = type;
    this.demande_intervention = demande_intervention;
  }

  ia_id: string;
  file_name: string;
  creer_le: Date;
  maj_le: Date;
  type: string;
  demande_intervention: DemandeInterventionsPersonnele;
}
export class DemandeAttachementDto {
  constructor() {
    this.files = [];
  }
  files: IAttachementDto[];
}
