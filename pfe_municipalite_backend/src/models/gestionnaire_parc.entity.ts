import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Employee from "./employee.entity";

@Entity({name: 'gestionnaire_parc'})
class GestionnaireParc{
    @PrimaryColumn()
    public gestionnaire_id: string;

    @OneToOne(() => Employee, {nullable:false, eager: true, onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'employee_id'})
    public employee: Employee;
}

export default GestionnaireParc;