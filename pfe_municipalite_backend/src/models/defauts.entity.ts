import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import DemandeInterventionsPersonnele from "./di_personnele.entity";


@Entity()
class Defauts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public name: string;

    @ManyToOne(() => DemandeInterventionsPersonnele, demande => demande.defauts)
    @JoinColumn({name:"di_id"})
    public deamnde: DemandeInterventionsPersonnele;
}

export default Defauts;