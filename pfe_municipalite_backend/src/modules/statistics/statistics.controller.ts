import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {

    constructor(
        private readonly statsService: StatisticsService
    ){}

    @Get('/vehicules_stats/status')
    async getVehiculeStatus(){
        return this.statsService.getVehiculesStatus();
    }

    @Get('/vehicules_stats/types')
    async getVehiculesByType(){
        return this.statsService.getVehiculesByType();
    }

    @Get('/vehicules_stats/service')
    async getVehiculesBySerivce(){
        return this.statsService.getVehiculesBySerivce();
    }

    @Get('/vehicules_stats/missing_documents')
    async getVehiculesStatsMissingDocuments(){
        return this.statsService.getVehiculesStatsMissingDocuments();
    }
}
