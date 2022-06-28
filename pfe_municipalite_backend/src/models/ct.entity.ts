import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Vehicule from "./vehicule.entity";

@Entity({name: 'controles_technique'})
class ControleTechnique {
    @PrimaryColumn()
    public num: string;

    @OneToOne(() => Vehicule)
    @JoinColumn({name: 'vehicule_id'})
    public vehicule: Vehicule;

    @Column()
    public date_visite: Date;

    @Column()
    public nature_visite: string;

    @Column()
    public observations: string;

    @Column()
    public nom_agence: string;

    @Column()
    public num_agrement: number;

    @Column()
    public date_fin_validité: Date;

    @Column({type: 'float'})
    public prix: number;
}

export default ControleTechnique;