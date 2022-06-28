import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import BonTravail from "./bon_travail.entity";
import Causes from "./causes.entity";
import Defauts from "./defauts.entity";
import Notes from "./notes.entity";
import Reparations from "./reparations.entity";

@Entity({name:"rapports_intervention"})
class RapportIntervention {
    @PrimaryColumn()
    public ri_id: string;

    @OneToMany(() => Causes, cause => cause.rapport, {cascade:true, eager: true, nullable:true})
    public causes: Causes[];

    @OneToMany(() => Reparations, reparation => reparation.rapport,{cascade:true, eager: true, nullable:true})
    public reparations: Reparations[];

    @OneToMany(() =>Notes, note => note.rapport, {cascade:true, eager:true, nullable:true})
    public notes: Notes[];

    @OneToOne(() => BonTravail, bon_travail => bon_travail.rapport_intervention)
    @JoinColumn({name:"bt_id"})
    public bon_travail: BonTravail;
}

export default RapportIntervention;