import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Employee from '../../models/employee.entity';
import { PayloadInterface } from '../../utils/interfaces/payload.infterface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import EmployeeTypes from '../../models/employee_types.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        @InjectRepository(EmployeeTypes)
        private employeeTypeRepository: Repository<EmployeeTypes>,
        private jwtService: JwtService,
    ){}

    async validateEmployee(payload: PayloadInterface):Promise<Employee>{
        console.log(payload)
        const employee = await this.employeeRepository.findOne({email: payload.email});
        const role_check = await this.employeeTypeRepository.findOne({role: payload.role});
        if(!employee){
            throw new HttpException('Aucun Compte avec cette email', HttpStatus.BAD_REQUEST);
        }else{
            const password_check = await bcrypt.compare(payload.password, employee.password);
            if(!password_check){
                throw new HttpException('Mot de pass Incorrect', HttpStatus.BAD_REQUEST);
            }
        }
        console.log(employee)
        if(employee.employeeType.type_id !== role_check.type_id){
           throw new HttpException('Credentials incorrect', HttpStatus.BAD_REQUEST);
        }
        
        const result = employee ;
        return result;
        
    }

    async generateToken(employee: Employee): Promise<string>{
        return await this.jwtService.signAsync({employee: employee}) ;
    }

    async login(credentiels : PayloadInterface){
        const employee = await this.validateEmployee(credentiels);
        if(employee){
            const token  = await this.generateToken(employee);
            return {user: employee,token: token};
        }
        
        throw new HttpException('invalid credentials', HttpStatus.BAD_REQUEST);
        
    }
}
