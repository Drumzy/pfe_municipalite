export const vehicules_missing_documents ={
    itemcount: 0,
    vehiculeStatusMissingDocuments: {
    missing_assurance: 0,
    missing_carte_grise: 0,
    missing_vignette: 0,
    missing_vehicue_it: 0,
    missing_assurance_ratio: 0,
    missing_carte_grise_ratio: 0,
    missing_vehicue_it_ratio: 0,
    missing_vignette_ratio: 0
    }
}
export const vehicluesTypes ={
    itemcount: 0,
    vehicuelsStatusType: {
    camion: 0,
    tracteur: 0,
    voiture: 0,
    pick_up: 0,
    camion_ratio: 0,
    tracteur_ratio: 0,
    voiture_ratio: 0,
    pick_up_ratio: 0
    }
}

export const chartDataType = {
        labels:["Camions","Tracteurs","Voitures","Pick-Ups"],
        datasets: [
            {
                label:"", 
                data:[0],
                backgroundColor:[
                    `pink`,
                    `red`,
                    `green`,
                    `yellow`,
                ],
                borderColor:[
                    `pink`,
                    `red`,
                    `green`,
                    `yellow`,
                ], 
                borderWidth:1
            }
        ]
    }