import Joi from "joi"

export const plansInitialState ={
    pm_id: "",
    type: "",
    nbr_repetition: 0,
    periodicite: "",
    mots_cle: ""
}
export const plansCMInitialState = {
    pm_id: "",
    type: "",
    nbr_repetition: 0,
    periodicite: "",
    mots_cle: "",
    reminders:[{pm_id:"",re_id:"",start_date:"",finish_date:"",maintenance: plansInitialState}]
}


export const marks = [
    {value: 0, label:"Negligeable"},
    {value: 25, label:"Impact faible"},
    {value: 50, label:"Impact modere"},
    {value: 75, label:"Impact fort"},
    {value: 100,label:"Impact sévère"}
]
export const importancefield = [
    {value: "Negligeable", label:0},
    {value: "Impact faible", label:25},
    {value: "Impact modere", label:50},
    {value: "Impact fort", label:75},
    {value: "Impact sévère", label:100}
]
export const plansData = [{
    key: "",
    label: "",
    value:"",
    disabled: true
}]

export const reminderSchema = {
    pm_id: Joi.string().allow(""),
    re_id: Joi.string().allow(""),
    date_debut:Joi.date().required().greater(Date.now() + 48 * 60 * 60 * 1000),
    date_finish: Joi.date().required().greater(Date.now() + 48 * 60 * 60 * 1000),
}

export const headers = (
    <tr>
        <th>Date de debut</th>
        <th>Date de fin</th>
        <th>Importane</th>
        <th>declarable</th>
    </tr>
)