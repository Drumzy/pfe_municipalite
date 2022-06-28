import { Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import BonTravail from "./bon_travail.entity";
import Employee from "./employee.entity";
import PlanMaintenance from "./plan_maintenance.entity";

@Entity({name: 'mecanciens'})
class Mecancien  {
    @PrimaryColumn()
    public mecancien_id: string;

    @OneToOne(() => Employee, {nullable: false, eager: true, onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'employee_id'})
    public employee: Employee;
   
    @ManyToMany(() => BonTravail, bn_travail => bn_travail.ouvries)
    public bn_travails: BonTravail[];

    @OneToMany(() => PlanMaintenance, plan_maintenance => plan_maintenance.assigned_to)
    public plan_maintenance : PlanMaintenance;
}

export default Mecancien;