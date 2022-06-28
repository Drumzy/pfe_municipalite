import Employee from "../../models/employee.entity";

export class CreateMecanicienDto {
    mecancien_id: string;
    employee_id: string;
    employee: Employee;
}

export class UpdateMecanicienDto {
    mecanicien_id: string;
    employee_id: string;
}