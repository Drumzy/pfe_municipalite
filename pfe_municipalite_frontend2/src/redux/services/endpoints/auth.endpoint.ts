import { api } from "../api";
import { LoginRequest, UserResponse } from "../interfaces/user.interface";

const authEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authEndpoint;
