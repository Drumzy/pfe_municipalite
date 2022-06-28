import { IsArray } from "class-validator";
import { EmployeePageMetaDto } from "./employee.page.meta.dto";

export class EmployeePageDto<T> {
    @IsArray()
    readonly data: T[];

    readonly meta: EmployeePageMetaDto;

    constructor(data: T[], meta: EmployeePageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}