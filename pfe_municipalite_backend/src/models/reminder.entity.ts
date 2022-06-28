import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import PlanMaintenance from "./plan_maintenance.entity";

@Entity()
class Reminder {
    @PrimaryColumn()
    re_id: string;

    @ManyToOne(()=> PlanMaintenance, plan_maintenance => plan_maintenance.reminders,{eager:true})
    @JoinColumn({name:"mt_id"})
    public maintenance: PlanMaintenance;

    @Column({type:"timestamp"})
    public start_date: Date;

    @Column({type:"timestamp"})
    public finish_date: Date;

    @Column()
    public importance: string;

    @Column()
    public declarable: boolean;
}

export default Reminder;