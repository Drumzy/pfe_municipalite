import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import Employee from "../../../models/employee.entity";
import { Role } from "../../../utils/enums/employeRole.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

export class RolesGuard implements CanActivate{

    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,[
                context.getHandler(),
                context.getClass()
            ]
        );
        
        if(!requiredRoles){
            return true;
        }

        const employee: {gestionnaire_id: string, employee : Employee}= context.switchToHttp().getRequest();
        
        return requiredRoles.some((role) => employee.employee.employeeType.role?.includes(role));
    }
    
}