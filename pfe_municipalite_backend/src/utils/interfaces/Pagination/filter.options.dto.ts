export class FilterOptionsDto {
    type: string;
    status: string;
    service: string;

    constructor(type: string, status: string, service: string){
        this.service = service;
        this.status = status;
        this.type = type;
    }
}