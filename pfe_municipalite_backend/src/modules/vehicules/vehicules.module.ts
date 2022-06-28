import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Vehicule from '../../models/vehicule.entity';
import { VehiculesController } from './vehicules.controller';
import { VehiculesService } from './vehicules.service';

@Module({
    imports: [TypeOrmModule.forFeature([Vehicule])],
    controllers: [VehiculesController],
    providers: [VehiculesService],
    exports: [VehiculesService,TypeOrmModule]
})
export class VehiculesModule {
    
}
