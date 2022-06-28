import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import RapportIntervention from "./rapport_intervention.entity";

@Entity({name:"reparation"})
class Reparations {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public name: string;

    @ManyToOne(() =>RapportIntervention, rapport => rapport.reparations)
    @JoinColumn({name:"ri_id"})
    public rapport: RapportIntervention;
}

export default Reparations;