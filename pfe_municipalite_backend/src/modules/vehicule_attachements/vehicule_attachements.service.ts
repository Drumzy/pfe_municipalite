import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Vehicule from '../../models/vehicule.entity';
import { Repository } from 'typeorm';
import VehiculeAttachement from '../../models/vehiculeAttch.entity';
import { AttachementDto, AttachementsDto } from '../../utils/dtos/files.dto';
import { v4 as uuid } from 'uuid';
@Injectable()
export class VehiculeAttachementsService {
  constructor(
    @InjectRepository(VehiculeAttachement)
    private vehiculeAttRepository: Repository<VehiculeAttachement>,
    @InjectRepository(Vehicule)
    private vehiculeRepository: Repository<Vehicule>,
  ) {}

  async addVehiculeAttachements(
    vehicule_id: string,
    categories: string,
    files: Array<Express.Multer.File>,
  ) {
    const vehicule_check = await this.vehiculeRepository.findOne({
      vehicule_id: vehicule_id,
    });
    if (!vehicule_check) {
      throw new HttpException(
        `Vehicule avec l'id : ${vehicule_id} n'existe pas`,
        HttpStatus.NOT_FOUND,
      );
    }
    const files_to = new AttachementsDto();
    files.map((file) => {
      files_to.files.push(
        new AttachementDto(
          uuid(),
          file.filename,
          new Date(),
          new Date(),
          file.mimetype,
          vehicule_check,
          categories,
        ),
      );
    });

    files_to.files.forEach(async (file) => {
      await this.vehiculeAttRepository.save(
        this.vehiculeAttRepository.create(file),
      );
    });

    return files_to;
  }
  async getVehiculeAttachements(vehicule_id: string) {
    const vehicule_check = await this.vehiculeRepository.findOne({
      where: { vehicule_id: vehicule_id },
    });
    if (!vehicule_check) {
      throw new HttpException(
        `Vehicule avec l'id : ${vehicule_id} n'existe pas`,
        HttpStatus.NOT_FOUND,
      );
    }
    const files = await this.vehiculeAttRepository.find({
      vehicule: vehicule_check,
    });

    return files;
  }
}
