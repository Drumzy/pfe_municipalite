import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import EmployeeTypes from './employee_types.entity';

@Entity({ name: 'employees' })
class Employee {
  @PrimaryColumn()
  public id: string;

  @Column()
  public cin: number;

  @Column()
  public nom: string;

  @Column()
  public prenom: string;

  @Column()
  public date_naissance: Date;

  @Column()
  public num_telephone: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => EmployeeTypes, {nullable:false, eager:true})
  @JoinColumn({ name: 'role' })
  public employeeType: EmployeeTypes;
}

export default Employee;
