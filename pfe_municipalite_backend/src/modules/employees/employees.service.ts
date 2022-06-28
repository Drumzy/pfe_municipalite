import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Employee from '../../models/employee.entity';
import { Repository } from 'typeorm';
import { EmployeePageDto } from '../../utils/interfaces/Pagination/employee.page.dto';
import { EmployeePageOptionsDto } from '../../utils/interfaces/Pagination/employee.page.options.dto';
import { EmployeePageMetaDto } from '../../utils/interfaces/Pagination/employee.page.meta.dto';
import { UpdateEmployeeDTO } from '../../utils/dtos/employee.dto';
import { updateCleaner } from '../../utils/updateCleaner.util';
import * as bcrypt from 'bcrypt';
@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async getAllEmployees(
    employee_pageOptionsDto: EmployeePageOptionsDto,
  ): Promise<EmployeePageDto<Employee>> {
    const queryBuilder =
      this.employeeRepository.createQueryBuilder('employees');

    queryBuilder
      .orderBy('employees.id', employee_pageOptionsDto.order)
      .skip(employee_pageOptionsDto.skip)
      .take(employee_pageOptionsDto.take)
      .leftJoinAndSelect('employees.employeeType', 'employees_types');
    if (employee_pageOptionsDto.role.length !== 0) {
      queryBuilder.andWhere('role_id = :role', {
        role_id: employee_pageOptionsDto.role,
      });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const employee_pageMetaDto = new EmployeePageMetaDto({
      itemCount,
      employee_pageOptionsDto,
    });

    return new EmployeePageDto(entities, employee_pageMetaDto);
  }
  async getEmployeeById(
    employee_id: string,
  ): Promise<Employee | HttpException> {
    const employee: Employee = await this.employeeRepository.findOne({
      id: employee_id,
    });

    if (!employee) {
      throw new HttpException(
        `Employee avec l'id : ${employee_id} n'existe pas`,
        HttpStatus.NOT_FOUND,
      );
    }

    return employee;
  }
  async updateEmployee(employee_updates: UpdateEmployeeDTO) {
    const employee_check = await this.employeeRepository.findOne({
      id: employee_updates.id,
    });
    if (!employee_check) {
      throw new HttpException(
        `Employee avec l'id : ${employee_updates.id} n'existe pas`,
        HttpStatus.NOT_FOUND,
      );
    }
    employee_updates.password = await bcrypt.hash(
      employee_updates.password,
      await bcrypt.genSalt(),
    );
    const updated_values = {
      id: employee_updates.id,
      cin: employee_updates.cin,
      nom: employee_updates.nom,
      prenom: employee_updates.prenom,
      email: employee_updates.email,
      date_naissance: employee_updates.date_naissance,
      password: employee_updates.password,
      num_telephone: employee_updates.num_telephone,
    };
    console.log(updated_values);
    const update_check = await this.employeeRepository.update(
      employee_updates.id,
      updated_values,
    );
    if (!update_check) {
      throw new HttpException(
        `Mise a jour n'est pas complete a cause d'un erreur`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return { message: `Votre profile a été mis a jour` };
  }
  async removeEmployee(employee_id: string) {
    const employee_check = await this.employeeRepository.findOne({
      id: employee_id,
    });
    if (!employee_check) {
      throw new HttpException(
        `Employee avec l'id : ${employee_id} existe deja`,
        HttpStatus.FOUND,
      );
    }

    const employee_remove = await this.employeeRepository.remove(
      employee_check,
    );
    if (employee_remove) {
      return { message: `Employee avec l'id : ${employee_id} est supprimé` };
    }

    throw new HttpException(
      `Something went wrong`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
