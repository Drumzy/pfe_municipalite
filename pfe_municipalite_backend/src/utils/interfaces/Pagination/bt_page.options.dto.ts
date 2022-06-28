import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Order } from "../../../utils/enums/order.enum";

export class BonTravailPageOptionsDto {
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.ASC;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly take?: number = 10;

    @Type(() => String)
    @IsString()
    @IsOptional()
    readonly status?: string = "";

    @Type(() => String)
    @IsString()
    @IsOptional()
    readonly vehicule_id?: string = "";
}