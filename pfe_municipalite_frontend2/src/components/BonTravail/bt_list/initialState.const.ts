export const btFilterInitialState = {
    status: "",
    vehicule_id: "",
}

export const BonTravailInitialState = {
    bt_id: "",
            date: "",
            demandeur: "",
            equipement: "",
            n_travail: "",
            usedEquipements: "{\"\"}",
            ouvries: [
                {
                    mecancien_id: "",
                    employee: {
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
                }
            ],
            demandes: [
                {
                    di_id: "",
                    date_declaration: "",
                    resume: "",
                    defauts: [{id:"",name:"",di_id:""}],
                    status: "",
                    reparation_provosoire: false,
                    declare_par: ""
                }
            ],
            rapport_intervention: {
                ri_id: "",
                causes: [
                    {
                        id: 0,
                        name: "",
                        di_id: "",
                    }
                ],
                reparations: [
                    {
                        id: 0,
                        name: "",
                        di_id: "",
                    }
                ],
                notes: [
                    {
                        id: 0,
                        name: "",
                        di_id: "",
                    }
                ],
            }
}