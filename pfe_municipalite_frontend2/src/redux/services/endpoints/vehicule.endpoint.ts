import { api } from "../api";
import {
  assurancePayload,
  carte_grisePayload,
  FileUploadDto,
  vehiculeItPayload,
  VehiculeResponse,
  vignettePayload,
  InformationTechnique,
  Assurance,
  CarteGrise,
  Vignette
} from "../interfaces/vehicule.interface";

const vehiculeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    add_vehicule: builder.mutation({
      query: (vehicule_info) => ({
        url: "/vehicules/add_vehicule",
        method: "POST",
        body: vehicule_info,
      }),
    }),
    add_vehiculeIt: builder.mutation({
      query: (vehiculeit_infos: vehiculeItPayload) => ({
        url: `/vehicules_its/add_vehicule_it/${encodeURIComponent(
          vehiculeit_infos.vehicule_id
        )}`,
        method: "POST",
        body: vehiculeit_infos.vehicule_it,
      }),
    }),
    add_assurance: builder.mutation({
      query: (assurance_infos: assurancePayload) => ({
        url: `/assurances/add_assurance/${encodeURIComponent(
          assurance_infos.vehicule_id
        )}`,
        method: "POST",
        body: assurance_infos.assurance,
      }),
    }),
    add_carte_grise: builder.mutation({
      query: (carte_grise_infos: carte_grisePayload) => ({
        url: `/cartes_grise/add_carte_grise/${encodeURIComponent(
          carte_grise_infos.vehicule_id
        )}`,
        method: "POST",
        body: carte_grise_infos.carte_grise,
      }),
    }),
    add_vignette: builder.mutation({
      query: (vignette_infos: vignettePayload) => ({
        url: `vignettes/add_vignette/${encodeURIComponent(
          vignette_infos.vehicule_id
        )}`,
        method: "POST",
        body: vignette_infos.vignette,
      }),
    }),
    add_vehicule_attachements: builder.mutation({
      query: (file_data: FileUploadDto) => ({
        url: `/vehicule_attachements/add_vehicule_attachements/${encodeURIComponent(
          file_data.vehicule_id!
        )}/${file_data.categories}`,
        method: "POST",
        body: file_data.files,
      }),
    }),
    get_vehicules: builder.query<
      VehiculeResponse,
      {
        order: string;
        page: number;
        take: number;
        status: string;
        service: string;
        type: string;
      }
    >({
      query: ({ page, order, take, status, service, type }) => ({
        url: `/vehicules/all?page=${page}&order=${order}&take=${take}&type=${type}&status=${status}&service=${service}`,
        method: "GET",
      }),
    }),
    get_vehicule_attachements: builder.query({
      query: (vehicule_id: string) => ({
        url: `/vehicule_attachements/vehicule_attachements/${encodeURIComponent(
          vehicule_id
        )}`,
        method: "GET",
      }),
    }),
    get_vehicule: builder.query({
      query: (vehicule_id: string) => ({
        url: `vehicules/${encodeURIComponent(vehicule_id)}`,
        method: "GET",
      }),
    }),
    get_assurance: builder.query({
      query: (vehicule_id: string) => ({
        url: `/assurances/${encodeURIComponent(vehicule_id)}`,
        method: "GET",
      }),
    }),
    get_vignette: builder.query({
      query: (vehicule_id: string) => ({
        url: `/vignettes/${encodeURIComponent(vehicule_id)}`,
        method: "GET",
      }),
    }),
    get_carte_grise: builder.query({
      query: (vehicule_id: string) => ({
        url: `/cartes-grise/${encodeURIComponent(vehicule_id)}`,
        method: "GET",
      }),
    }),
    get_vehiculeIt: builder.query({
      query: (vehicule_id: string) => ({
        url: `vehicules_its/${encodeURIComponent(vehicule_id)}`,
        method: "GET",
      }),
    }),
    delete_vehicule: builder.query({
      query: (vehicule_id: string) => ({
        url: `/vehicules/remove_vehicule/${encodeURIComponent(vehicule_id)}`,
        method: "DELETE",
      }),
    }),
    update_vehicule_it: builder.mutation({
      query: (vehiculeIt: InformationTechnique) => ({
        url: `vehicules_its/update_vehicule_it`,
        method: "PUT",
        body: vehiculeIt
      })
    }),
    update_assurance: builder.mutation({
      query: (assurance: Assurance) => ({
        url: `assurances/update_assurance`,
        method: "PUT",
        body: assurance
      })
    }),
    update_carte_grise: builder.mutation({
      query: (carte_grise: CarteGrise) => ({
        url: `cartes_grise/update_carte_grise`,
        method: "PUT",
        body: carte_grise
      })
    }),
    update_vignette: builder.mutation({
      query: (vignettes: Vignette) => ({
        url: `vignettes/update_vignette`,
        method: "PUT",
        body: vignettes
      })
    }),
  }),
});

export const {
  useAdd_vehiculeMutation,
  useAdd_vehiculeItMutation,
  useAdd_assuranceMutation,
  useAdd_carte_griseMutation,
  useAdd_vignetteMutation,
  useLazyGet_assuranceQuery,
  useLazyGet_carte_griseQuery,
  useLazyGet_vehiculeItQuery,
  useLazyGet_vignetteQuery,
  useLazyGet_vehiculeQuery,
  useLazyGet_vehiculesQuery,
  useAdd_vehicule_attachementsMutation,
  useLazyGet_vehicule_attachementsQuery,
  useLazyDelete_vehiculeQuery,
  useUpdate_vehicule_itMutation,
  useUpdate_assuranceMutation,
  useUpdate_carte_griseMutation,
  useUpdate_vignetteMutation,
} = vehiculeApi;
