import { vehiculeInitialState } from "../../Vehicules/vehiculesList/initialState.consts"

export const interventionInitialState = {
    di_id: "",
    date_declaration: "",
    resume: "",
    status: "",
    reparation_provosoire: false,
    declare_par: "",
    defauts: [{id:"",name:"",key:""}],
    vehicule: {
        vehicule_id: "",
        immatriculation: "",
        num_chassis: "",
        type: "",
         service: "",
        benne: false,
        status: "",
        attachements:[{categories:"",creer_le:"",file_name:"",maj_le:"",type:"",vha_id:""}]
    }
}

export const interventionFilterInitialState = {
    vehicule_id: "",
    status: "",
}