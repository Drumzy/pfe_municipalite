import Vehicule from "../../models/vehicule.entity";
import { Column, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import BonTravail from "../../models/bon_travail.entity";

export abstract class DemandeIntervention {
    @PrimaryColumn()
    public di_id: string;

    @Column({type:"timestamp with time zone"})
    public date_declaration: Date;

    @Column()
    public resume: string;

    @Column()
    public status: string;

    @Column({type:'boolean'})
    public reparation_provosoire: boolean;

}