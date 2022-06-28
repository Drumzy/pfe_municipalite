import { api } from "../api";
import { CreateReminderDto } from "../interfaces/maintenance.interface";

const reminderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    set_reminder: builder.mutation({
      query: (new_reminder: CreateReminderDto) => ({
        url: "reminders/set_reminder",
        method: "POST",
        body: new_reminder,
      }),
    }),
    get_reminder: builder.query({
      query: () => ({
        url: `reminders/all`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSet_reminderMutation, useLazyGet_reminderQuery } = reminderApi;
