import { api } from "../api";
import { CreatePlanDto } from "../interfaces/maintenance.interface";

const maintenanceApi = api.injectEndpoints({
    endpoints : (builder) => ({
        get_plans : builder.query({
            query: () => ({
                url: "/plan_maintenance/all",
                method: "GET"
            })
        }),
        get_plan_by_id: builder.query({
            query: (pm_id: string) => ({
                url: `/plan_maintenance/plan/${encodeURIComponent(pm_id)}`,
                method: "GET"
            })
        }),
        add_plan : builder.mutation({
            query : (new_plan: CreatePlanDto) => ({
                url: `/plan_maintenance/add_plan`,
                method: "POST",
                body: new_plan,
            })
        }),
        remove_plan: builder.query({
            query: (plan_id: string) => ({
                url: `/plan_maintenance/remove_plan/${encodeURIComponent(plan_id)}`,
                method: "DELETE",
            })
        })
    })
});

export const {useAdd_planMutation, useLazyRemove_planQuery, useLazyGet_plansQuery, useLazyGet_plan_by_idQuery} = maintenanceApi;