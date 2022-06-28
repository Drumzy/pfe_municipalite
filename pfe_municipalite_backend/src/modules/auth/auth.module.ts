import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import Employee from '../../models/employee.entity';
import EmployeeTypes from '../../models/employee_types.entity';

dotenv.config();

@Module({
  imports: [PassportModule.register({defaultStrategy:'jwt'}),JwtModule.register({
              secret: process.env.SECRET,
              signOptions:{
                expiresIn:"1h"
              }
              }), TypeOrmModule.forFeature([Employee,EmployeeTypes])],
  providers: [AuthService, JwtStrategy, TypeOrmModule],
  controllers: [AuthController],
})
export class AuthModule {}
