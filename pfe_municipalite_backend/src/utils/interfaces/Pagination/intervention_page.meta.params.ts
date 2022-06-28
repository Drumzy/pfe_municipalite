import { InterventionPageOptionsDto } from "./intervention_page.options.dto";
import { InterventionFilterOptionsDto } from "./intervention_filer.options.dto"
export interface InterventionPageMetaDtoParameters {
    filterOptionsDto: InterventionFilterOptionsDto;
    interventionPageOptionsDto: InterventionPageOptionsDto;
    itemCount: number;
}