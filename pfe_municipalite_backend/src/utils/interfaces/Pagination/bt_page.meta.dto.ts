import { BonTravailPageMetaDtoParameters } from "./bt_page.meta.params";

export class BonTravailPageMetaDto {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
    readonly filters: string[];
    constructor({bt_pageOptionsDto, itemCount}: BonTravailPageMetaDtoParameters){
        this.page = bt_pageOptionsDto.page;
        this.take = bt_pageOptionsDto.take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
        this.filters = [];
    }
}