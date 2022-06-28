import { Body, Controller, Post } from '@nestjs/common';
import { CreateRapportDto } from '../../utils/dtos/rapport_intervention.dto';
import { RapportInterventionService } from './rapport_intervention.service';

@Controller('rapport_intervention')
export class RapportInterventionController {

    constructor(
        public readonly rapportService: RapportInterventionService
    ){}

    @Post("/add_rapport")
    async CreateRapport(@Body() rapportDto: CreateRapportDto) {
        console.log(rapportDto);
        return this.rapportService.createRapport(rapportDto);
    }
}
