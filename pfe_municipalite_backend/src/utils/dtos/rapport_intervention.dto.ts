export class CreateRapportDto {
    ri_id: string;
    bt_id: string;
    causes: {name:string; active: boolean; key: string}[];
    reparations: {name:string; active: boolean; key: string}[];
    notes: {name:string; active: boolean; key: string}[];
}