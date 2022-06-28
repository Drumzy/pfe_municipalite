import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CarteGrise from '../../models/carte_grise.entity';
import { VehiculesModule } from '../vehicules/vehicules.module';
import { CartesGriseController } from './cartes_grise.controller';
import { CartesGriseService } from './cartes_grise.service';

@Module({
    imports: [TypeOrmModule.forFeature([CarteGrise]), VehiculesModule],
    controllers: [CartesGriseController],
    providers: [CartesGriseService]
})
export class CartesGriseModule {}
