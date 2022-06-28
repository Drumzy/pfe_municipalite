import { api } from "../api";

const statisticApi = api.injectEndpoints({
    endpoints: (builder) => ({
        get_vehicules_status: builder.query({
            query: () => ({
                url: "/statistics/vehicules_stats/status",
                method: "GET"
            })
        }),
        get_vehicules_types: builder.query({
            query: () => ({
                url: "/statistics/vehicules_stats/types",
                method: "GET"
            })
        }),
        get_vehicules_service: builder.query({
            query : () => ({
                url: "/statistics/vehicules_stats/service",
                method: "GET"
            })
        }),
        get_vehicules_missing_documents: builder.query({
            query: () => ({
                url: "/statistics/vehicules_stats/missing_documents",
                method: "GET"
            })
        })
    })
})

export const {useLazyGet_vehicules_statusQuery, useLazyGet_vehicules_typesQuery, useLazyGet_vehicules_serviceQuery, useLazyGet_vehicules_missing_documentsQuery} = statisticApi;