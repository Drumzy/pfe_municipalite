import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import EmployeeTypes from '../../models/employee_types.entity';
import { Repository } from 'typeorm';
import { RolePayload } from '../../utils/interfaces/payload.infterface';

@Injectable()
export class EmployeeRolesService {

    constructor(@InjectRepository(EmployeeTypes) private employeeTypeRepository: Repository<EmployeeTypes>){}

    async getAllRoles (): Promise<EmployeeTypes[]> {
        const roles = await this.employeeTypeRepository.find();

        return roles;
    }

    async createEmployeeRole(payload: RolePayload): Promise<EmployeeTypes>{
        const role_check = await this.employeeTypeRepository.findOne({role: payload.role});
        if(role_check){
            throw new HttpException(`Role : ${payload.role} existe déja`, HttpStatus.FOUND);
        }
        const role_id: string = payload.role.slice(0,3) + '#' + randomUUID() 
        const new_role = await this.employeeTypeRepository.save(this.employeeTypeRepository.create({type_id: role_id, role: payload.role}));

        if(!new_role){
            throw new HttpException('Erreur lors de create de role', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new_role;
    }

}
