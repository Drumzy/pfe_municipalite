import { string } from "joi";
import { api } from "../api";
import {
  ConducteurPayLoad,
  EmployeeInterface,
  GestionnaireParcPayload,
  MecanicienPayLoad,
  RoleInterface,
  RolePayload,
  User,
} from "../interfaces/user.interface";

const employeeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    get_employee: builder.query({
      query: (employee_id: string) => ({
        url: `/employees/${encodeURIComponent(employee_id)}`,
        method: "GET",
      }),
    }),
    get_employees: builder.query<
      EmployeeInterface,
      { order: string; page: number; take: number; role: string }
    >({
      query: ({ page, order, take, role }) => ({
        url: `/employees/all?page=${page}&order=${order}&take=${take}&role=${role}`,
        method: "GET",
      }),
    }),
    get_mecaniciens: builder.query({
      query: () => ({
        url: `/mecanicien/all`,
        method: "GET",
      }),
    }),
    create_role: builder.mutation({
      query: (payload: RolePayload) => ({
        url: `/employee_roles/add_role`,
        method: "POST",
        body: payload,
      }),
    }),
    add_gp: builder.mutation({
      query: (payload: GestionnaireParcPayload) => ({
        url: `/gestionnaire_parc/add_gestionnaire`,
        method: "POST",
        body: payload,
      }),
    }),
    add_mc: builder.mutation({
      query: (payload: MecanicienPayLoad) => ({
        url: `mecanicien/add_mecanicien`,
        method: "POST",
        body: payload,
      }),
    }),

    add_cd: builder.mutation({
      query: (payload: ConducteurPayLoad) => ({
        url: `conducteur/add_conducteur`,
        method: "POST",
        body: payload,
      }),
    }),
    get_roles: builder.query<Array<RoleInterface>, void>({
      query: () => ({
        url: "/employee_roles/all",
        method: "GET",
      }),
    }),
    update_employee: builder.mutation({
      query: (payload: User) => ({
        url: `/employees/update_employee`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLazyGet_employeeQuery,
  useLazyGet_employeesQuery,
  useCreate_roleMutation,
  useAdd_gpMutation,
  useAdd_mcMutation,
  useAdd_cdMutation,
  useLazyGet_rolesQuery,
  useLazyGet_mecaniciensQuery,
  useUpdate_employeeMutation,
} = employeeApi;
