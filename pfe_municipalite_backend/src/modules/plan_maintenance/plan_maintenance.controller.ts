import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePlanMaintenanceDto } from '../../utils/dtos/plan_maintenance.dto';
import { PlanMaintenanceService } from './plan_maintenance.service';

@Controller('plan_maintenance')
export class PlanMaintenanceController {

    constructor(private readonly planService: PlanMaintenanceService){}

    @Get('/all')
    async GetAllPlans(){
        return this.planService.GetAllPlans();
    }

    @Get("/plan/:id")
    async GetPlanById(@Param('id') pm_id: string){
        return this.planService.getPlanById(pm_id);
    }

    @Post('/add_plan')
    async CreatePlan(@Body() planDto: CreatePlanMaintenanceDto){
        return this.planService.CreatePlan(planDto);
    }

    @Delete('/remove_plan/:id')
    async RemovePlan(@Param('id') plan_id: string) {
        return this.planService.deletePlan(plan_id);
    }
}
