import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Assurance,
  CarteGrise,
  InformationTechnique,
  Vehicule,
  Vignette,
} from "../../services/interfaces/vehicule.interface";
import { RootState } from "../../store";

type VehiculeState = {
  vehicule: Vehicule | null;
  assurance: Assurance | null;
  carte_grise: CarteGrise | null;
  vignette: Vignette | null;
  infos_technique: InformationTechnique | null;
};

const vehiculeSlice = createSlice({
  name: "vehicule",
  initialState: {
    vehicule: null,
    assurance: null,
    carte_grise: null,
    vignette: null,
    infos_technique: null,
  } as VehiculeState,
  reducers: {
    setVehicule: (state, action: PayloadAction<{ vehicule: Vehicule }>) => {
      console.log(action.payload.vehicule);
      state.vehicule = action.payload.vehicule;
    },
    setAssurance: (
      state,
      { payload: { assurance } }: PayloadAction<{ assurance: Assurance }>
    ) => {
      state.assurance = assurance;
    },
    setCarteGrise: (
      state,
      { payload: { carte_grise } }: PayloadAction<{ carte_grise: CarteGrise }>
    ) => {
      state.carte_grise = carte_grise;
    },
    setVignette: (
      state,
      { payload: { vignette } }: PayloadAction<{ vignette: Vignette }>
    ) => {
      state.vignette = vignette;
    },
    setInfosTechnique: (
      state,
      {
        payload: { infos_technique },
      }: PayloadAction<{ infos_technique: InformationTechnique }>
    ) => {
      state.infos_technique = infos_technique;
    },
  },
});

export const {
  setVehicule,
  setAssurance,
  setCarteGrise,
  setInfosTechnique,
  setVignette,
} = vehiculeSlice.actions;

export default vehiculeSlice.reducer;

export const selectCurrentVehicule = (state: RootState) => state.vehicule;
