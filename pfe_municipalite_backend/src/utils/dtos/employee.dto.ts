import EmployeeTypes from "../../models/employee_types.entity";

export class CreateEmployeeDto{
    id: string;
    cin: number;
    nom: string;
    prenom: string;
    date_naissance: Date;
    num_telephone: number;
    email: string;
    password: string;
    role: string;
    employeeType: EmployeeTypes; 
}

export class UpdateEmployeeDTO{
    id: string;
    cin: number;
    nom: string;
    prenom: string;
    date_naissance: Date;
    num_telephone: number;
    email: string;
    password: string;
    role_id: string; 
}