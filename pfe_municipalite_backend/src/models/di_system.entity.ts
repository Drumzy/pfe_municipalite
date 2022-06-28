import { DemandeIntervention } from "../utils/interfaces/di.interface";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Vehicule from "./vehicule.entity";

@Entity({name: 'd_interventions_systeme'})
class DemandeInterventionSysteme extends DemandeIntervention {
    @ManyToOne(() => Vehicule, (vehicule) => vehicule.dis)
    @JoinColumn({name: "vehicule_id"})
    public vehicule: Vehicule;
}

export default DemandeInterventionSysteme;