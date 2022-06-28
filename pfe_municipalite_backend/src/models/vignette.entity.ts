import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Vehicule from "./vehicule.entity";

@Entity({
    name: 'vignettes'
})
class Vignette {
    @PrimaryColumn()
    public vignette_id: string;

    @OneToOne(() => Vehicule,{nullable:false, onDelete:'CASCADE',onUpdate:'CASCADE'})
    @JoinColumn({name: 'vehicule_id'})
    public vehicule: Vehicule;

    @Column()
    public num_quittance: string;


    @Column()
    public date_debut: Date;

    @Column()
    public date_fin: Date;

    @Column({
        type: 'float'
    })
    public prix: number;

    @Column()
    public attachement: string;
}

export default Vignette;