import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Vehicule from "./vehicule.entity";

@Entity({name: 'vidanges'})
class Vidange {
    @PrimaryColumn()
    public vidange_id: string;

    @OneToOne(() => Vehicule)
    @JoinColumn({name: 'vehicule_id'})
    public vehicule: Vehicule;

    @Column()
    public p_rendez_vous: Date;

    @Column()
    public d_rendez_vous: Date;

    @Column({type: 'float'})
    public d_cout: number;

    @Column({type: 'float'})
    public cout: number;
}

export default Vidange;