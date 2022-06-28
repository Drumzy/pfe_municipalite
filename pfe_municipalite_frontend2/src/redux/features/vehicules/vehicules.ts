import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Assurance,
  CarteGrise,
  Vehicule,
  Vignette,
  InformationTechnique,
} from "../../services/interfaces/vehicule.interface";
import { RootState } from "../../store";

type VehiculesState = {
  vehicules: Vehicule[] | null;
  assurances: Assurance[] | null;
  carte_grise: CarteGrise[] | null;
  vignettes: Vignette[] | null;
  infos_technique: InformationTechnique[] | null;
};

const vehiculesSlice = createSlice({
  name: "vehicules",
  initialState: {
    vehicules: null,
    assurances: null,
    carte_grise: null,
    vignettes: null,
    infos_technique: null,
  } as VehiculesState,
  reducers: {
    setVehicules: (
      state,
      { payload: { vehicules } }: PayloadAction<{ vehicules: Vehicule[] }>
    ) => {
      state.vehicules = vehicules;
    },
  },
});

export const { setVehicules } = vehiculesSlice.actions;

export default vehiculesSlice.reducer;

export const selectVehicules = (state: RootState) => state.vehicule;
