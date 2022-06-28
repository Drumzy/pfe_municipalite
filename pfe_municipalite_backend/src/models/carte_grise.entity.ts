import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import Vehicule from "./vehicule.entity";

@Entity({name: 'cartes_grise'})
class CarteGrise {
    @PrimaryColumn()
    public carte_grise_id: string;

    @OneToOne(() => Vehicule,{nullable:false,onDelete:'CASCADE',onUpdate:'CASCADE'})
    @JoinColumn({name: 'vehicule_id'})
    public vehicule: Vehicule;

    @Column()
    adresse: string;

    @Column()
    public matricule_fiscale: string;

    @Column()
    public activite: string;

    @Column()
    public genre: string; 

    @Column()
    public num_serie_type: string;

    @Column({type:'date'})
    public date_mise_circulation: Date;

}

export default CarteGrise;