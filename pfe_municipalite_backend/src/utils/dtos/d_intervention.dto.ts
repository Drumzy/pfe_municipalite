import InterventionAttachement from "src/models/interventionAttch.entity";
import Vehicule from "../../models/vehicule.entity";

export class DemandeInterventionPersonneleDto {
    di_id: string;
    date_declaration: Date;
    resume: string;
    defaults: string;
    reparation_provosoire: boolean;
    declare_par: string;
    vehicule: Vehicule;
    d_intervention_attachements:InterventionAttachement[];
}