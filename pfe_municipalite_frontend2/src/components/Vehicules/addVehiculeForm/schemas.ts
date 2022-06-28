import Joi from "joi";

export const schema_Identification = Joi.object({
  immatriculation: Joi.string()
    .min(5)
    .message("Immatriculation doit avoir au moins 6 lettres"),
  num_chassis: Joi.string()
    .min(5)
    .message("N° chassis doit avoir au moins 6 lettres"),
  type: Joi.string().valid(...["Camion", "Tracteur","Voiture","Pick-up"]),
  service: Joi.string().valid(...["Nettoyage", "Chantier","Transport"]),
  status: Joi.string().valid(
    ...["Active", "Hors Service", "En Panne", "Inactive"]
  ),
});

export const schema_VehiculeIT = Joi.object({
  vit_id: Joi.string().allow(""),
  motorisation: Joi.string().required(),
  pf: Joi.number().required(),
  moteur: Joi.string().required(),
  volume_reservoire: Joi.number().required(),
  marque: Joi.string().required(),
  modele: Joi.string().required(),
});

export const schema_Vignette = Joi.object({
  vignette_id: Joi.string().allow(""),
  vehicule_id: Joi.string().allow(""),
  num_quittance: Joi.string().required(),
  date_debut: Joi.date().required(),
  date_fin: Joi.date().required(),
  prix: Joi.number().required(),
  attachement: Joi.string().allow(""),
});

export const schema_CarteGrise = Joi.object({
  vehicule_id: Joi.string().allow(""),
  carte_grise_id: Joi.string().allow(""),
  adresse: Joi.string().required(),
  matricule_fiscale: Joi.string().required(),
  activite: Joi.string().required(),
  genre: Joi.string().required(),
  num_serie_type: Joi.string().required(),
  date_mise_circulation: Joi.date().required(),
  attachement: Joi.string().allow(""),
});

export const schema_Assurance = Joi.object({
  vehicule_id: Joi.string().allow(""),
  assurance_id: Joi.string().allow(""),
  numero: Joi.number().required(),
  nom_agence: Joi.string().required(),
  date_debut: Joi.date().required(),
  date_fin: Joi.date().required(),
  attachement: Joi.string().allow(""),
});
