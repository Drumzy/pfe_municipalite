import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BonTravailPageOptionsDto } from '../../utils/interfaces/Pagination/bt_page.options.dto';
import { CreateBonTravailDto } from '../../utils/dtos/bon_travail.dto';
import { BonTravailService } from './bon_travail.service';

@Controller('bon_travail')
export class BonTravailController {

    constructor(
        public bn_travailService: BonTravailService
    ){}

    @Get('/all')
    async getAllBonsTravail(@Query() bt_pageOptionsDto: BonTravailPageOptionsDto){
        return this.bn_travailService.getBonsTravail(bt_pageOptionsDto)
    }
    @Get(":id")
    async getBonTravailById(@Param("id") id: string){
        return this.bn_travailService.getBonTravailById(id);
    }
    @Post("/add_bon_travail")
    async createBonTravail(@Body() bon_travail: CreateBonTravailDto){
        return this.bn_travailService.CreateBonTravail(bon_travail);
    }
}
