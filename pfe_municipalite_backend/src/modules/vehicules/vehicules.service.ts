import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Vehicule from '../../models/vehicule.entity';
import { Repository } from 'typeorm';
import {
  CreateVehiculeDto,
  UpdateVehiculeDto,
} from '../../utils/dtos/vehicule.dto';
import { updateCleaner } from '../../utils/updateCleaner.util';
import { PageOptionsDto } from '../../utils/interfaces/Pagination/page.options.dto';
import { PageDto } from '../../utils/interfaces/Pagination/page.dto';
import { PageMetaDto } from '../../utils/interfaces/Pagination/page.meta.dto';
import { FilterOptionsDto } from '../../utils/interfaces/Pagination/filter.options.dto';

@Injectable()
export class VehiculesService {
  constructor(
    @InjectRepository(Vehicule)
    private vehiculesRepository: Repository<Vehicule>,
  ) {}

  async getAllVehicules(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Vehicule>> {
    const filterOptionsDto: FilterOptionsDto = new FilterOptionsDto(
      pageOptionsDto.type,
      pageOptionsDto.status,
      pageOptionsDto.service,
    );
    const queryBuilder =
      this.vehiculesRepository.createQueryBuilder('vehicules');
    queryBuilder
      .orderBy('vehicules.vehicule_id', pageOptionsDto.order)
      .leftJoinAndSelect('vehicules.attachements', 'attachements')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
    if (filterOptionsDto.service.length !== 0) {
      queryBuilder.andWhere('service = :service', {
        service: filterOptionsDto.service,
      });
    }

    if (filterOptionsDto.status.length !== 0) {
      queryBuilder.andWhere('status = :status', {
        status: filterOptionsDto.status,
      });
    }

    if (filterOptionsDto.type.length != 0) {
      queryBuilder.andWhere('vehicules.type = :type', { type: filterOptionsDto.type });
    }
    const itemCount = await queryBuilder.getCount();
    console.log(itemCount);
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      filterOptionsDto,
      pageOptionsDto,
    });

    return new PageDto(entities, pageMetaDto);
  }

  async getVehiculeById(id: string) {
    const vehicule = await this.vehiculesRepository.findOne({
      where: { vehicule_id: id },
    });
    if (vehicule) {
      return vehicule;
    }

    throw new HttpException('Vehicule Not Found', HttpStatus.NOT_FOUND);
  }

  async createVehicule(vehicule: CreateVehiculeDto) {
    const vehicule_check = await this.vehiculesRepository.findOne({
      immatriculation: vehicule.immatriculation,
    });
    if (vehicule_check) {
      throw new HttpException(`Cette Vehicule existe déja`, HttpStatus.FOUND);
    }
    const newVehicule = this.vehiculesRepository.create(vehicule);
    await this.vehiculesRepository.save(newVehicule);

    return newVehicule;
  }

  async updateVehicule(vehicule_updates: UpdateVehiculeDto) {
    const vehicule_check = await this.vehiculesRepository.findOne({
      vehicule_id: vehicule_updates.vehicule_id,
    });
    if (!vehicule_check) {
      throw new HttpException(
        `Vehicule with the id : ${vehicule_updates.vehicule_id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const updated_values = updateCleaner(vehicule_updates);

    const update_check = await this.vehiculesRepository.update(
      vehicule_check.vehicule_id,
      updated_values,
    );
    if (update_check) {
      return {
        message: `vehicule with the id : ${vehicule_updates.vehicule_id} has been updated`,
      };
    }

    throw new HttpException(
      `Something went wrong`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async removeVehicule(vehicule_id: string) {
    const vehicule_check = await this.vehiculesRepository.findOne({
      vehicule_id: vehicule_id,
    });
    if (!vehicule_check) {
      throw new HttpException(
        `Vehicule with the id : ${vehicule_id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const vehicule_remove = await this.vehiculesRepository.remove(
      vehicule_check,
    );
    if (vehicule_remove) {
      return { message: 'Vehicule removed' };
    }

    throw new HttpException(
      `Something went wrong`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
