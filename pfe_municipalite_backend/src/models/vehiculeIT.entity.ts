import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import Vehicule from "./vehicule.entity";

@Entity()
class VehiculeIT {
    @PrimaryColumn()
    public vit_id: string;

    @OneToOne(() => Vehicule,{nullable:false, onDelete:'CASCADE',onUpdate:'CASCADE'})
    @JoinColumn({name: 'vehicule_id'})
    public vehicule: Vehicule;

    @Column()
    public motorisation: string;

    @Column()
    public pf: number;

    @Column()
    public moteur:string;

    @Column()
    public volume_reservoire: number;
    
    @Column()
    public marque: string;

    @Column()
    public modele: string;
}

export default VehiculeIT;