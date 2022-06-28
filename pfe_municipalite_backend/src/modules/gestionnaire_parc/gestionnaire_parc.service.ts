import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateGestionnaireParcDTO,
  UpdateGestionnaireParcDTO,
} from '../../utils/dtos/gestionnaire_parc.dto';
import { Repository } from 'typeorm';
import GestionnaireParc from '../../models/gestionnaire_parc.entity';
import { updateCleaner } from '../../utils/updateCleaner.util';
import {
  CreateEmployeeDto,
  UpdateEmployeeDTO,
} from '../../utils/dtos/employee.dto';
import Employee from '../../models/employee.entity';
import * as bcrypt from 'bcrypt';
import EmployeeTypes from '../../models/employee_types.entity';

@Injectable()
export class GestionnaireParcService {
  constructor(
    @InjectRepository(GestionnaireParc)
    private gestionnaire_parcRepository: Repository<GestionnaireParc>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(EmployeeTypes)
    private employeeTypesRepository: Repository<EmployeeTypes>,
  ) {}

  async getAllGestionnaires(): Promise<GestionnaireParc[]> {
    const gestionnaires: GestionnaireParc[] =
      await this.gestionnaire_parcRepository.find();

    return gestionnaires;
  }

  async GetGestionnaireById(
    gestionnaire_id: string,
  ): Promise<GestionnaireParc | HttpException> {
    const gestionnaire: GestionnaireParc =
      await this.gestionnaire_parcRepository.findOne({
        gestionnaire_id: gestionnaire_id,
      });
    if (!gestionnaire) {
      throw new HttpException(
        `Gestionnaire avec l'id : ${gestionnaire_id} n'existe pas`,
        HttpStatus.NOT_FOUND,
      );
    }

    return gestionnaire;
  }

  async createGestionnaire(
    employee: CreateEmployeeDto,
    gestionnaire: CreateGestionnaireParcDTO,
  ): Promise<GestionnaireParc | HttpException> {
    const employee_check = await this.employeeRepository.findOne({
      email: employee.email,
    });
    if (employee_check) {
      throw new HttpException(
        `Gestionnaire avec l'email: ${employee.email} existe deja`,
        HttpStatus.FOUND,
      );
    }
    const salt = await bcrypt.genSalt();
    employee.password = await bcrypt.hash(employee.password, salt);
    const role_check = await this.employeeTypesRepository.findOne({
      type_id: employee.role,
    });
    if (!role_check) {
      throw new HttpException(`Role n'existe pas`, HttpStatus.NOT_FOUND);
    }
    employee.employeeType = role_check;

    const new_employee = await this.employeeRepository.save(
      this.employeeRepository.create(employee),
    );
    if (!new_employee) {
      throw new HttpException(
        `Erreur lors de la creation d'employee`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    gestionnaire.employee_id = new_employee.id;
    gestionnaire.employee = new_employee;
    const gestionnaire_check = await this.gestionnaire_parcRepository.findOne({
      gestionnaire_id: gestionnaire.gestionnaire_id,
    });
    if (gestionnaire_check) {
      throw new HttpException(
        `Gestionnaire avec l'id : ${gestionnaire.gestionnaire_id} existe deja`,
        HttpStatus.FOUND,
      );
    }

    const new_gestionnaire = await this.gestionnaire_parcRepository.save(
      this.gestionnaire_parcRepository.create(gestionnaire),
    );
    if (!new_gestionnaire) {
      throw new HttpException(
        `Erreur lors de la creation de gestionnaire de parc`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new_gestionnaire;
  }

  async updateGestionnaire(
    employee_updates: UpdateEmployeeDTO,
    gestionnaire_updates: UpdateGestionnaireParcDTO,
  ) {
    const employee_check = await this.employeeRepository.findOne({
      id: employee_updates.id,
    });
    if (!employee_check) {
      throw new HttpException(
        `Employee avec l'id : ${employee_updates.id} existe deja`,
        HttpStatus.FOUND,
      );
    }

    const updated_values1 = updateCleaner(employee_updates);

    gestionnaire_updates.employee_id = employee_updates.id;

    const gestionnaire_check = await this.gestionnaire_parcRepository.findOne({
      gestionnaire_id: gestionnaire_updates.gestionnaire_id,
    });
    if (!gestionnaire_check) {
      throw new HttpException(
        `Gestionnaire avec l'id : ${gestionnaire_updates.gestionnaire_id} existe deja`,
        HttpStatus.FOUND,
      );
    }
    const updated_values2 = updateCleaner(gestionnaire_updates);

    const update_check1 = await this.employeeRepository.update(
      employee_check.id,
      updated_values1,
    );
    if (update_check1) {
      const update_check2 = await this.gestionnaire_parcRepository.update(
        gestionnaire_check.gestionnaire_id,
        updated_values2,
      );
      if (update_check2) {
        return {
          message: `Gestionnaire avec l'id : ${gestionnaire_updates.gestionnaire_id} est mis a jour`,
        };
      } else {
        throw new HttpException(
          `Prombleme lors de mise ajour des informations de gestionnaire`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    throw new HttpException(
      `Something went wrong`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
