import Employee from "../../models/employee.entity";

export class CreateGestionnaireParcDTO{
    gestionnaire_id: string;
    employee_id: string;
    employee: Employee;
}

export class UpdateGestionnaireParcDTO{
    gestionnaire_id: string;
    employee_id: string;
}