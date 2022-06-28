import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { InterventionPageDto } from '../../utils/interfaces/Pagination/intervention_page.dto';
import DemandeInterventionsPersonnele from '../../models/di_personnele.entity';
import { InterventionPageOptionsDto } from '../../utils/interfaces/Pagination/intervention_page.options.dto';
import { InterventionPersonneleService } from './intervention_personnele.service';
import { DemandeInterventionPersonneleDto } from '../../utils/dtos/d_intervention.dto';

@Controller('intervention_personnele')
export class InterventionPersonneleController {

    constructor(private readonly intervention_personneleService: InterventionPersonneleService){}

    @Get('all')
    getAllInterventions(@Query() intervention_pageOptionsDto: InterventionPageOptionsDto): Promise<InterventionPageDto<DemandeInterventionsPersonnele>> {
        return this.intervention_personneleService.getAllInterventions(intervention_pageOptionsDto);
    }

    @Get('demandes/:id')
    getDemandeIntervention(@Param('id') id: string){
        return this.intervention_personneleService.getDemandeIntervention(id);
    }

    @Post('add_demande_intervention/')
    createDemandeIntervention(@Body() demandeInterventionDto: DemandeInterventionPersonneleDto){
        return this.intervention_personneleService.createIntervention(demandeInterventionDto);
    }
}
