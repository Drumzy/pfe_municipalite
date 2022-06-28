import { DemandeIntervention } from "../utils/interfaces/di.interface";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import InterventionAttachement from "./interventionAttch.entity";
import Vehicule from "./vehicule.entity";
import BonTravail from "./bon_travail.entity";
import Defauts from "./defauts.entity";

@Entity({name: 'd_interventions_personnele'})
class DemandeInterventionsPersonnele extends DemandeIntervention {
    @Column({nullable:false})
    public declare_par: string;

    @ManyToOne(() => Vehicule, (vehicule) => vehicule.disp, {onDelete:"CASCADE", onUpdate:"CASCADE"})
    @JoinColumn({name: "vehicule_id"})
    public vehicule: Vehicule;

    @ManyToOne(() => BonTravail, bn_travail => bn_travail.demandes)
    public bns_travail: BonTravail[];

    @OneToMany(() => Defauts, defaut => defaut.deamnde,{cascade:true, eager:true})
    public defauts: Defauts[];

    @OneToMany(() => InterventionAttachement, (i_attachement) => i_attachement.demande_intervention, {cascade: true})
    d_intervention_attachements: InterventionAttachement[];
}

export default DemandeInterventionsPersonnele;