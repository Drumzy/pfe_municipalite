import DemandeInterventionsPersonnele from "../../models/di_personnele.entity";
import Mecancien from "../../models/mecancien.entity";

export class CreateBonTravailDto {
    bt_id: string;
    date: Date;
    equipement: string;
    n_travail: string;
    usedEquipements: string;
    selected_mecaniciens: string[];
    ouvriers: Mecancien[];
    demandes: DemandeInterventionsPersonnele[];
}