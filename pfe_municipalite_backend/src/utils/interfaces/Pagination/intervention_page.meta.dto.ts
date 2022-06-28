
import { InterventionPageMetaDtoParameters } from "./intervention_page.meta.params";

export class InterventionPageMetaDto{
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage : boolean;
    readonly hasNextPage: boolean;
    readonly filters: string[];
    constructor({interventionPageOptionsDto, itemCount}: InterventionPageMetaDtoParameters){
        this.page = interventionPageOptionsDto.page;
        this.take = interventionPageOptionsDto.take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
        this.filters = [];
    }
}