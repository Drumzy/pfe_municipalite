import Mecancien from "../../models/mecancien.entity";
import Vehicule from "../../models/vehicule.entity";

export interface CreatePlanMaintenanceDto {
    pm_id: string;
    type :string;
    nbr_repetition: number;
    assigned_to: string;
    mots_cle: string;
    periodicite: string;
    concerned_equipement: string;
}