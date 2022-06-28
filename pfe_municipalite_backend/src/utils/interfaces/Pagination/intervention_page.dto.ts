import { IsArray } from "class-validator";
import { InterventionPageMetaDto } from "./intervention_page.meta.dto";

export class InterventionPageDto<T> {

    @IsArray()
    readonly data: T[];
    readonly meta: InterventionPageMetaDto;

    constructor(data: T[], meta: InterventionPageMetaDto){
        this.data = data;
        this.meta = meta;
    }
}