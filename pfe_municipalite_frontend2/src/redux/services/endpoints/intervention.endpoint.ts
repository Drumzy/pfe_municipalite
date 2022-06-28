import { api } from "../api";
import {
  DemandeInterventionPersonnele,
  InterventionResponse,
} from "../interfaces/intervention.interface";

const interventionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    get_demandes: builder.query<
      InterventionResponse,
      { order: string; page: number; take: number; status: string; vehicule_id: string }
    >({
      query: ({ page, order, take, status, vehicule_id }) => ({
        url: `/intervention_personnele/all?page=${page}&order=${order}&take=${take}&status=${status}&vehicule=${vehicule_id}`,
        method: "GET",
      }),
    }),
    get_demande: builder.query({
      query: (di_id: string) => ({
        url: `/intervention_personnele/demandes/${encodeURIComponent(di_id)}`,
        method: "GET",
      }),
    }),
    add_demande_probleme: builder.mutation({
      query: (demandeInterventionDto: DemandeInterventionPersonnele) => ({
        url: `/intervention_personnele/add_demande_intervention`,
        method: "POST",
        body: demandeInterventionDto,
      }),
    }),
  }),
});

export const {
  useLazyGet_demandesQuery,
  useLazyGet_demandeQuery,
  useAdd_demande_problemeMutation,
} = interventionApi;
