"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ClinicSettings = {
  _id: string;
  whatsappNumber?: string;
  phoneNumber?: string;
  email?: string;
  location?: string;
  mapUrl?: string;
  workingHour?: { city?: string; day?: string }[] | string;
  instagram?: string;
  facebook?: string;
  twiter?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Publication = {
  _id: string;
  year: string;
  date: string;
  title: string;
  journal: string;
  meta?: string;
  doi?: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.drbachirabiad.com/api/v1";

function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    window.localStorage.getItem("adminToken") ??
    window.localStorage.getItem("token")
  );
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAccessToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Publications"],
  endpoints: (builder) => ({
    getPublications: builder.query<Publication[], void>({
      query: () => "/publications",
      providesTags: ["Publications"],
    }),
  }),
});

export const { useGetPublicationsQuery } = api;
