import { FormList } from "@mantine/form/lib/form-list/form-list";
import { PageMetaDto, Vehicule } from "./vehicule.interface";

export interface DemandeInterventionPersonnele {
  di_id: string;
  date_declaration: string;
  resume: string;
  status: string;
  reparation_provosoire: boolean;
  declare_par: string;
  defauts: {id:string,name:string,key:string}[];
  vehicule: Vehicule;
}
export interface DemandeInterventionPersonnele2 {
  di_id: string;
  date_declaration: string;
  resume: string;
  status: string;
  reparation_provosoire: boolean;
  declare_par: string;
  defauts: {id:string,name:string,di_id:string}[];
  vehicule: Vehicule;
}
export type InterventionResponse = {
  data: DemandeInterventionPersonnele[];
  meta: PageMetaDto;
};
