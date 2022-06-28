export const employeeData = {
    id: "",
    cin: 0,
    nom: "",
    prenom: "",
    date_naissance: "",
    num_telephone: 0,
    email: "",
    password: "",
    employeeType: {
        type_id: "",
        role: ""
    }
}

export const bnt_initialState = {
    equipement : "",
    description : ""
}

export const mecanicienInitialState = {
    employee:{
        id: "",
        cin: 0,
        nom: "",
        prenom:"",
        date_naissance: "",
        email: "",
        password:"",
        num_telephone: 0,
        employeeType:{
            type_id: "",
            role: "",
        },
    },
    mecancien_id: "",
}

export const mecanicienData: Array<{
    key: string;
    label: string;
    value: string;
}> = [{
    key: "",
    label:"",
    value:"",
}]
