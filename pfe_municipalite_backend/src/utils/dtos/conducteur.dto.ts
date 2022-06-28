import Employee from '../../models/employee.entity';

export class CreateConducteurDto {
  conducteur_id: string;
  employee_id: string;
  num_permis_conduire: Number;
  employee: Employee;
}

export class UpdateConducteurDto {
  conducteur_id: string;
  employee_id: string;
  num_permis_conduire: Number;
}
