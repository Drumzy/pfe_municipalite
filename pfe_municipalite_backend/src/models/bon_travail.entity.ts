import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import Mecancien from "./mecancien.entity";
import DemandeInterventionsPersonnele from "./di_personnele.entity";
import RapportIntervention from "./rapport_intervention.entity";

@Entity({name: "bns_travail"})
class BonTravail {
    @PrimaryColumn()
    public bt_id: string;

    @Column({type: "timestamp with time zone"})
    public date : Date;

    @Column()
    demandeur: string;

    @Column()
    public equipement: string;

    @Column({type:"text",nullable:true})
    public n_travail: string;

    @Column({nullable:true})
    public usedEquipements: string;

    @ManyToMany(() => Mecancien, mecanicien => mecanicien.bn_travails, {cascade:true,eager:true})
    @JoinTable()
    public ouvries: Mecancien[];

    @OneToMany(() => DemandeInterventionsPersonnele, demande => demande.bns_travail, {eager:true})
    public demandes: DemandeInterventionsPersonnele[];

    @OneToOne(() => RapportIntervention, rapport => rapport.bon_travail,{cascade:true, eager:true, nullable:true})
    public rapport_intervention: RapportIntervention;
}

export default BonTravail;