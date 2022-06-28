import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Employee from '../../models/employee.entity';
import EmployeeTypes from '../../models/employee_types.entity';
import Conducteur from 'src/models/conducteur.entity';
import { Repository } from 'typeorm';
import {
  CreateConducteurDto,
  UpdateConducteurDto,
} from 'src/utils/dtos/conducteur.dto';
import * as bcrypt from 'bcrypt';
import { updateCleaner } from '../../utils/updateCleaner.util';
import {
  CreateEmployeeDto,
  UpdateEmployeeDTO,
} from 'src/utils/dtos/employee.dto';

@Injectable()
export class ConducteurService {
  constructor(
    @InjectRepository(Conducteur)
    private conducteurRepository: Repository<Conducteur>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(EmployeeTypes)
    private employeeTypesRepository: Repository<EmployeeTypes>,
  ) {}

  async getAllConducteur(): Promise<Conducteur[]> {
    const conducteur: Conducteur[] = await this.conducteurRepository.find();

    return conducteur;
  }

  async getConducteurById(conducteur_id: string): Promise<Conducteur> {
    const conducteur = await this.conducteurRepository.findOne({
      where: { conducteur_id: conducteur_id },
      relations: ['vehicules'],
    });
    if (!conducteur) {
      throw new HttpException(
        `Conducteur avec l'id : ${conducteur_id} n'esite pas `,
        HttpStatus.NOT_FOUND,
      );
    }

    return conducteur;
  }

  async createConducteur(
    employee: CreateEmployeeDto,
    conducteur: CreateConducteurDto,
  ): Promise<Conducteur | HttpException> {
    const employee_check = await this.employeeRepository.findOne({
      email: employee.email,
    });
    if (employee_check) {
      throw new HttpException(
        `Conducteur avec l'email : ${employee.email} existe deja`,
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
    console.log(employee);
    const new_employee = await this.employeeRepository.save(
      this.employeeRepository.create(employee),
    );

    if (!new_employee) {
      throw new HttpException(
        `Erreur lors de la creation d'employee`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    conducteur.employee_id = new_employee.id;
    conducteur.employee = new_employee;
    const conducteur_check = await this.conducteurRepository.findOne({
      conducteur_id: conducteur.conducteur_id,
    });
    if (conducteur_check) {
      throw new HttpException(
        `Conducteur avec l'id : ${conducteur_check.conducteur_id} existe deja`,
        HttpStatus.FOUND,
      );
    }

    const new_conducteur = await this.conducteurRepository.save(
      this.conducteurRepository.create(conducteur),
    );

    if (!new_conducteur) {
      throw new HttpException(
        `Erreur lors de la creation de compte de Conducteur`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new_conducteur;
    
  }

  async updateConducteur(
    employee_updates: UpdateEmployeeDTO,
    conducteur_updates: UpdateConducteurDto,
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

    conducteur_updates.employee_id = employee_updates.id;

    const conducteur_check = await this.conducteurRepository.findOne({
      conducteur_id: conducteur_updates.conducteur_id,
    });
    if (!conducteur_check) {
      throw new HttpException(
        `Conducteur avec l'id : ${conducteur_updates.conducteur_id} existe deja`,
        HttpStatus.FOUND,
      );
    }
    const updated_values2 = updateCleaner(conducteur_updates);

    const update_check1 = await this.employeeRepository.update(
      employee_check.id,
      updated_values1,
    );
    if (update_check1) {
      const update_check2 = await this.conducteurRepository.update(
        conducteur_check.conducteur_id,
        updated_values2,
      );
      if (update_check2) {
        return {
          message: `Conducteur avec l'id : ${conducteur_check.conducteur_id} est mis a jour`,
        };
      } else {
        throw new HttpException(
          `Prombleme lors de mise ajour des informations de Conducteur`,
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
