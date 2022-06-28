export class InterventionFilterOptionsDto {
    vehicule_id: string
    status: string;
    constructor(vehicule_id: string, status: string){
        this.vehicule_id = vehicule_id ;
        this.status = status;
    }
}