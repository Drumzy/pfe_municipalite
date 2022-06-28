import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import RapportIntervention from "./rapport_intervention.entity";

@Entity()
class Notes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public name: string;

    @ManyToOne(() =>RapportIntervention, rapport => rapport.notes)
    @JoinColumn({name:"ri_id"})
    public rapport: RapportIntervention;
}

export default Notes;