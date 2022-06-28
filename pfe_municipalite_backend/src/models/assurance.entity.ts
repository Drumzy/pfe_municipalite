import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Vehicule from "./vehicule.entity";

@Entity({
    name: 'assurances',
})
class Assurance {
    @PrimaryColumn()
    public assurance_id: string;
    
    @Column()
    public numero: number;

    @Column()
    public nom_agence: string;

    @Column()
    public date_debut: Date;

    @Column()
    public date_fin: Date;
    
    @OneToOne(() => Vehicule,{nullable:false,  onDelete:'CASCADE',onUpdate:'CASCADE'})
    @JoinColumn({name: 'vehicule_id'})
    public vehicule: Vehicule;
}

export default Assurance;