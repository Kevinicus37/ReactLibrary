import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:44371/api/" }),
  endpoints: (builder) => ({
    addNewBook: builder.mutation({
      query: ({ book }) => ({
        url: "Book",
        method: "POST",
        body: book,
      }),
    }),
  }),
});

export const { useAddNewBookMutation } = bookApi;
