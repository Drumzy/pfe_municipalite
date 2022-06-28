import { IsArray } from "class-validator";
import { BonTravailPageMetaDto } from "./bt_page.meta.dto";

export class BonTravailPageDto<T> {
    @IsArray()
    readonly data: T[];
    
    readonly meta: BonTravailPageMetaDto;

    constructor(data: T[], meta: BonTravailPageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}