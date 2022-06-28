import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv';
import { JwtPayload } from "../../../utils/interfaces/payload.infterface";
import { Repository } from "typeorm";
import Employee from "../../../models/employee.entity";
import * as bcrypt from "bcrypt" ;
import { InjectRepository } from "@nestjs/typeorm";

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET,
        })
    }

    async validate(payload: JwtPayload){
       return {
        id: payload.id,
        cin: payload.cin,
        nom: payload.nom,
        prenom: payload.prenom,
        email: payload.email,
        role: payload.role,
        password: payload.password
       }
    }
}