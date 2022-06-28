import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Employee from '../../models/employee.entity';
import EmployeeTypes from '../../models/employee_types.entity';
import Mecancien from '../../models/mecancien.entity';
import { Repository } from 'typeorm';
import {
  CreateEmployeeDto,
  UpdateEmployeeDTO,
} from '../../utils/dtos/employee.dto';
import {
  CreateMecanicienDto,
  UpdateMecanicienDto,
} from '../../utils/dtos/mecanicien.dto';
import * as bcrypt from 'bcrypt';
import { updateCleaner } from '../../utils/updateCleaner.util';

@Injectable()
export class MecanicienService {
  constructor(
    @InjectRepository(Mecancien)
    private mecanicienRepository: Repository<Mecancien>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(EmployeeTypes)
    private employeeTypesRepository: Repository<EmployeeTypes>,
  ) {}

  async getAllMecaniciens(): Promise<Mecancien[]> {
    const mecaniciens: Mecancien[] = await this.mecanicienRepository.find();

    return mecaniciens;
  }

  async getMecanicienById(mecancien_id: string): Promise<Mecancien> {
    const mecanicien = await this.mecanicienRepository.findOne({
      where: { mecancien_id: mecancien_id },
      relations: ['bn_travails'],
    });
    if (!mecanicien) {
      throw new HttpException(
        `Mecanicien avec l'id : ${mecancien_id} n'esite pas `,
        HttpStatus.NOT_FOUND,
      );
    }

    return mecanicien;
  }

  async createMecanicien(
    employee: CreateEmployeeDto,
    mecancien: CreateMecanicienDto,
  ): Promise<Mecancien | HttpException> {
    const employee_check = await this.employeeRepository.findOne({
      email: employee.email,
    });
    if (employee_check) {
      throw new HttpException(
        `Mecanicien avec l'email : ${employee.email} existe deja`,
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
    console.log(employee)
    const new_employee = await this.employeeRepository.save(
      this.employeeRepository.create(employee),
    );
  
    if (!new_employee) {
      throw new HttpException(
        `Erreur lors de la creation d'employee`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    mecancien.employee_id = new_employee.id;
    mecancien.employee = new_employee;
    const mecancien_check = await this.mecanicienRepository.findOne({
      mecancien_id: mecancien.mecancien_id,
    });
    if (mecancien_check) {
      throw new HttpException(
        `Mecanicien avec l'id : ${mecancien_check.mecancien_id} existe deja`,
        HttpStatus.FOUND,
      );
    }

    const new_mecanicien = await this.mecanicienRepository.save(
      this.mecanicienRepository.create(mecancien),
    );

    if (!new_mecanicien) {
      throw new HttpException(
        `Erreur lors de la creation de compte de Mecancien`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new_mecanicien;
  }

  async updateMecanicien(
    employee_updates: UpdateEmployeeDTO,
    mecanicien_updates: UpdateMecanicienDto,
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

    mecanicien_updates.employee_id = employee_updates.id;

    const mecanicien_check = await this.mecanicienRepository.findOne({
      mecancien_id: mecanicien_updates.mecanicien_id,
    });
    if (!mecanicien_check) {
      throw new HttpException(
        `Mecanicien avec l'id : ${mecanicien_updates.mecanicien_id} existe deja`,
        HttpStatus.FOUND,
      );
    }
    const updated_values2 = updateCleaner(mecanicien_updates);

    const update_check1 = await this.employeeRepository.update(
      employee_check.id,
      updated_values1,
    );
    if (update_check1) {
      const update_check2 = await this.mecanicienRepository.update(
        mecanicien_check.mecancien_id,
        updated_values2,
      );
      if (update_check2) {
        return {
          message: `Mecanicien avec l'id : ${mecanicien_updates.mecanicien_id} est mis a jour`,
        };
      } else {
        throw new HttpException(
          `Prombleme lors de mise ajour des informations de Mecanicien`,
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
