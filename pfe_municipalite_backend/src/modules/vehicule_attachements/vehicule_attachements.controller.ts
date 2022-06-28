import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { VehiculeAttachementsService } from './vehicule_attachements.service';
import * as dotenv from 'dotenv';
import {
  multerOptions,
  multerOptions_AS,
  multerOptions_CG,
  multerOptions_IT,
  multerOptions_VI,
} from '../../utils/multer.options';
import { query, Response } from 'express';

dotenv.config();

@Controller('vehicule_attachements')
export class VehiculeAttachementsController {
  constructor(
    private readonly vehiculeAttchService: VehiculeAttachementsService,
  ) {}

  @Post('/add_vehicule_attachements/:id/:categories')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
  async addAttachements(
    @Param('id') id: string,
    @Param('categories') categories: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.vehiculeAttchService.addVehiculeAttachements(
      id,
      categories,
      files,
    );
  }

  @Post('/add_vehicule_attachements/:id/:categories')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions_IT))
  async addITAttachements(
    @Param('id') id: string,
    @Param('categories') categories: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.vehiculeAttchService.addVehiculeAttachements(
      id,
      categories,
      files,
    );
  }

  @Post('/add_vehicule_attachements/:id/:categories')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions_AS))
  async addASAttachements(
    @Param('id') id: string,
    @Param('categories') categories: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.vehiculeAttchService.addVehiculeAttachements(
      id,
      categories,
      files,
    );
  }

  @Post('/add_vehicule_attachements/:id/:categories')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions_CG))
  async addCGAttachements(
    @Param('id') id: string,
    @Param('categories') categories: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.vehiculeAttchService.addVehiculeAttachements(
      id,
      categories,
      files,
    );
  }

  @Post('/add_vehicule_attachements/:id/:categories')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions_VI))
  async addVIAttachements(
    @Param('id') id: string,
    @Param('categories') categories: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.vehiculeAttchService.addVehiculeAttachements(
      id,
      categories,
      files,
    );
  }

  @Get('/vehicule_attachements/:id')
  async getVehiculeAttachements(
    @Param('id') id: string,
    @Param('categories') categories: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.vehiculeAttchService.getVehiculeAttachements(id);
  }
}
