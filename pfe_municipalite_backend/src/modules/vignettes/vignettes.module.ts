import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Vignette from '../../models/vignette.entity';
import { VehiculesModule } from '../vehicules/vehicules.module';
import { VignettesController } from './vignettes.controller';
import { VignettesService } from './vignettes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vignette]),VehiculesModule],
  controllers: [VignettesController],
  providers: [VignettesService]
})
export class VignettesModule {}
