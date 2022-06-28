import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import Mecancien from "./mecancien.entity";
import Reminder from "./reminder.entity";
import Vehicule from "./vehicule.entity";

@Entity()
class PlanMaintenance {

    constructor(pm_id: string,type: string, nbr_repetition: number, assigned_to: Mecancien, mots_cle: string,periodicite: string, vehicule: Vehicule){
        this.pm_id = pm_id;
        this.type = type;
        this.nbr_repetition = nbr_repetition;
        this.assigned_to = assigned_to;
        this.periodicite = periodicite;
        this.mots_cle = mots_cle;
        this.vehicule = vehicule;
    }

    @PrimaryColumn()
    public pm_id: string;

    @Column()
    public type: string;
    
    @Column()
    public nbr_repetition: number;

    @ManyToOne(() => Mecancien, mecanicien => mecanicien.plan_maintenance)
    @JoinColumn({name: 'mec_id'})
    public assigned_to : Mecancien;

    @Column()
    public mots_cle : string;

    @Column()
    public periodicite: string;

    @OneToMany(() => Reminder, reminder => reminder.maintenance)
    public reminders: Reminder[];

    @ManyToOne(() => Vehicule, vehicule => vehicule.maintenances)
    @JoinColumn({name:"vehicule_id"})
    public vehicule: Vehicule;
}
export default PlanMaintenance;