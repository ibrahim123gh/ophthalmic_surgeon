import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type ClinicSection = {
  title?: string;
  description?: string;
};

export type AboutSection = ClinicSection & {
  core?: { title?: string }[];
  profileHiglight?: string;
  image?: string;
};

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
  AppointmentsSurgicalCare?: ClinicSection;
  ClinicSchedule?: ClinicSection;
  SurgicalExpertise?: ClinicSection;
  aboutSection?: AboutSection;
  ourServices?: ClinicSection;
  WhyChooseUs?: ClinicSection;
  clinicInformation?: ClinicSection;
  research?: ClinicSection;
  videoPage?: ClinicSection;
  createdAt?: string;
  updatedAt?: string;
};

type ClinicSettingsState = {
  data: ClinicSettings | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

type ClinicSettingsStateRoot = {
  clinicSettings: ClinicSettingsState;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.drbachirabiad.com/api/v1";

const initialState: ClinicSettingsState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchClinicSettings = createAsyncThunk<
  ClinicSettings | null,
  void,
  { state: ClinicSettingsStateRoot }
>("clinicSettings/fetch", async () => {
  const response = await fetch(`${API_BASE_URL}/settings`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load settings");
  }

  const data = (await response.json()) as ClinicSettings[] | ClinicSettings | null;

  if (Array.isArray(data)) {
    return data[0] ?? null;
  }

  return data;
}, {
  condition: (_, { getState }) => {
    const { status } = getState().clinicSettings;
    return status === "idle" || status === "failed";
  },
});

const clinicSettingsSlice = createSlice({
  name: "clinicSettings",
  initialState,
  reducers: {
    clearClinicSettingsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinicSettings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchClinicSettings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchClinicSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load settings";
      });
  },
});

export const { clearClinicSettingsError } = clinicSettingsSlice.actions;

export const selectClinicSettings = (state: ClinicSettingsStateRoot) =>
  state.clinicSettings.data;

export const selectClinicSettingsStatus = (state: ClinicSettingsStateRoot) =>
  state.clinicSettings.status;

export default clinicSettingsSlice.reducer;
