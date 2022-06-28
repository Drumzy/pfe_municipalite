import { EmployeePageMetaDtoParameters } from "./employee.page.meta.params";
import { EmployeePageOptionsDto } from "./employee.page.options.dto";

export class EmployeePageMetaDto {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage : boolean;
    readonly hasNextPage: boolean;
    readonly filters: string[];

    constructor({employee_pageOptionsDto, itemCount}: EmployeePageMetaDtoParameters){
        this.page = employee_pageOptionsDto.page;
        this.take = employee_pageOptionsDto.take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page <this.pageCount;
        this.filters = [];
    }
}