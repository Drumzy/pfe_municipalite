import { api } from "../api";
import { BonTravailResponse, CreateBonTravailDto, CreateRapportDto } from "../interfaces/bon_travail.interface";

const bon_travailApi = api.injectEndpoints({
    endpoints: (builder) => ({
        create_bon_travail: builder.mutation({
            query: (createBonTravailDto: CreateBonTravailDto) => ({
                url: `/bon_travail/add_bon_travail`,
                method: "POST",
                body: createBonTravailDto,
            })
        }),
        get_bons_travail: builder.query<BonTravailResponse,{ order: string; page: number; take: number; status: string; vehicule_id: string }>({
            query: ({ page, order, take, status, vehicule_id }) => ({
                url: `/bon_travail/all?page=${page}&order=${order}&take=${take}&status=${status}&vehicule=${vehicule_id}`,
                method: "GET",
            }),
        }),
        get_bonTravailById: builder.query({
            query: (bt_id: string) => ({
                url: `/bon_travail/${encodeURIComponent(bt_id)}`,
                method: "GET",
            })
        }),
        create_rapport: builder.mutation({
            query: (createRapportDto: CreateRapportDto) => ({
                url: `/rapport_intervention/add_rapport`,
                method: "POST",
                body: createRapportDto,
            })
        })
    })
});


export const {useCreate_bon_travailMutation, useLazyGet_bons_travailQuery, useLazyGet_bonTravailByIdQuery,useCreate_rapportMutation} = bon_travailApi;