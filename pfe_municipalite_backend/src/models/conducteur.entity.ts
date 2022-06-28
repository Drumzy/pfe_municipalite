import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryColumn } from "typeorm";
import Employee from "./employee.entity";
import Vehicule from "./vehicule.entity";

@Entity({name: 'conducteurs'})
class Conducteur {
    
    @PrimaryColumn()
    public conducteur_id: string;

    @OneToOne(() => Employee, {nullable: false, eager: true, onDelete: 'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'employee_id'})
    public employee: Employee;

    @Column()
    public num_permis_conduire: Number;

    @ManyToMany(() => Vehicule, vehicule => vehicule.conducteurs)
    public vehicules: Vehicule[];

}

export default Conducteur;