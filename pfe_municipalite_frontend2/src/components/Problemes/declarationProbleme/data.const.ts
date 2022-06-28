import { Vehicule } from "../../../redux/services/interfaces/vehicule.interface";

export const vehiculeData: Array<{
  key: string;
  label: string;
  value: string;
  vehicule: Vehicule;
}> = [
  {
    key: "",
    label: "",
    value: "",
    vehicule: {
      vehicule_id: "",
      immatriculation: "",
      num_chassis: "",
      type: "",
      service: "",
      benne: false,
      status: "",
      
    },
  },
];