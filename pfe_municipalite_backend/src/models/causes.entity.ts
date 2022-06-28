import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import RapportIntervention from "./rapport_intervention.entity";

@Entity()
class Causes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public name: string;

    @ManyToOne(() =>RapportIntervention, rapport => rapport.causes)
    @JoinColumn({name:"ri_id"})
    public rapport: RapportIntervention;
}

export default Causes;