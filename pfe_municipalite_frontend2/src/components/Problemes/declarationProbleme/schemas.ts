import Joi from "joi";

export const schema_DemandeIntervention = {
    di_id: "string",
    date_declaration: Joi.date().required().label("Date Déclaration"),
    resume: Joi.string().required().label("Resumé"),
    status: Joi.string().label("Status"),
    defaults: Joi.array(),
    reparation_provosoire: Joi.boolean().required(),
    declare_par: Joi.string().required().allow(""),
    vehicule_id: Joi.string().required().label("Vehicule"),
    vehicule: Joi.object().allow(null)
}