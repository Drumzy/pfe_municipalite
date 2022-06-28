import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Role } from '../utils/enums/employeRole.enum';
import Employee from './employee.entity';

@Entity({ name: 'employees_types' })
class EmployeeTypes {
  @PrimaryColumn()
  public type_id: string;

  @Column({ type: 'enum', enum: Role })
  public role: string;

  @OneToMany(() => Employee, employee => employee.employeeType)
    public employee: Employee[];
}

export default EmployeeTypes;
