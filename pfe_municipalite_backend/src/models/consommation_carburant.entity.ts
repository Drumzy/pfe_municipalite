import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Vehicule from "./vehicule.entity";

@Entity()
class ConsommationCarburant {
    @PrimaryColumn()
    public cci: string;

    @ManyToOne(() => Vehicule, (vehicule) => vehicule.ccs)
    @JoinColumn({name: 'vehicule_id'})
    public vehicule: Vehicule;

    @Column({type: 'float'})
    public volume_recharge: number;

    @CreateDateColumn()
    public date_recharge: Date;
}

export default ConsommationCarburant;