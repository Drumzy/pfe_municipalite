import { FilterOptionsDto } from "./filter.options.dto";
import { PageOptionsDto } from "./page.options.dto";

export interface PageMetaDtoParameters {
    filterOptionsDto: FilterOptionsDto;
    pageOptionsDto: PageOptionsDto;
    itemCount: number;
}