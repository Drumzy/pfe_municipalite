import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateVehiculeInfoTechniqueDTO,
  UpdateVehiculeInfoTechniqueDTO,
} from '../../utils/dtos/vehicule.dto';
import VehiculeIT from '../../models/vehiculeIT.entity';
import { Repository } from 'typeorm';
import Vehicule from '../../models/vehicule.entity';
import { updateCleaner } from '../../utils/updateCleaner.util';

@Injectable()
export class VehiculesItsService {
  constructor(
    @InjectRepository(VehiculeIT)
    private vehiculesitsRepository: Repository<VehiculeIT>,
    @InjectRepository(Vehicule)
    private vehiculesRepository: Repository<Vehicule>,
  ) {}

  async getAllVehiculesIts(): Promise<VehiculeIT[]> {
    const vehiculesits: VehiculeIT[] = await this.vehiculesitsRepository.find();

    return vehiculesits;
  }

  async getVehiculeItByVehiculeId(vehicule_id: string) {
    const vehicule_check = await this.vehiculesRepository.findOne({
      vehicule_id: vehicule_id,
    });
    if (vehicule_check) {
      const vehicule_it = await this.vehiculesitsRepository.findOne({
        vehicule: vehicule_check,
      });
      if (vehicule_it) {
        return vehicule_it;
      }
      throw new HttpException(
        `Information technique de vehicule avec id : ${vehicule_id} n'est pas trouvable`,
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      `Vehicule avec l'id: ${vehicule_id} n'est pas trouvable`,
      HttpStatus.NOT_FOUND,
    );
  }

  async createVehiculeIt(
    vehicule_id: string,
    vehicule_it: CreateVehiculeInfoTechniqueDTO,
  ): Promise<VehiculeIT> {
    const vehicule = await this.vehiculesRepository.findOne({
      vehicule_id: decodeURI(vehicule_id),
    });
    if (!vehicule) {
      throw new HttpException(
        `Vehicule with the id : ${vehicule_id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    vehicule_it.vehicule = vehicule;

    const vehicule_it_check = await this.vehiculesitsRepository.findOne({
      vit_id: vehicule_it.vit_id,
    });
    if (vehicule_it_check) {
      throw new HttpException(
        `Information technique avec id : ${vehicule_it_check.vit_id} exists deja`,
        HttpStatus.FOUND,
      );
    }

    const new_vehicule_it = await this.vehiculesitsRepository.save(
      this.vehiculesitsRepository.create(vehicule_it),
    );
    return new_vehicule_it;
  }

  async updateVehiculeIt(vehicule_it_updates: UpdateVehiculeInfoTechniqueDTO) {
    const vehicule_it_check = await this.vehiculesitsRepository.findOne({
      vit_id: vehicule_it_updates.vit_id,
    });
    if (!vehicule_it_check) {
      throw new HttpException(
        `Information technique avec id : ${vehicule_it_updates.vit_id} n'est pas trouvable`,
        HttpStatus.NOT_FOUND,
      );
    }
    const updated_values = updateCleaner(vehicule_it_updates);

    const update_check = await this.vehiculesitsRepository.update(
      vehicule_it_check.vit_id,
      updated_values,
    );
    if (update_check) {
      return {
        message: `Information technique de vehicule avec id : ${vehicule_it_updates.vit_id} est mis a jour`,
      };
    }

    throw new HttpException(
      `Something went wrong`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async removeVehiculeIt(vit_id: string) {
    const vehicule_it_check = await this.vehiculesitsRepository.findOne({
      vit_id: vit_id,
    });
    if (!vehicule_it_check) {
      throw new HttpException(
        `Information technique de vehicule avec id : ${vit_id} n'est pas trouvable`,
        HttpStatus.NOT_FOUND,
      );
    }
    const vehicule_it_remove = await this.vehiculesitsRepository.remove(
      vehicule_it_check,
    );
    if (vehicule_it_remove) {
      return {
        message: `Information technique de vehicule avec id : ${vit_id} a ete supprimer`,
      };
    }

    throw new HttpException(
      `Something went wrong`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
