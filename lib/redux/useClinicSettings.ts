"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./hooks";
import {
  fetchClinicSettings,
  selectClinicSettings,
  selectClinicSettingsStatus,
} from "./clinicSettingsSlice";

export function useClinicSettings() {
  const dispatch = useAppDispatch();
  const clinicSettings = useAppSelector(selectClinicSettings);
  const status = useAppSelector(selectClinicSettingsStatus);

  useEffect(() => {
    void dispatch(fetchClinicSettings());
  }, [dispatch]);

  return {
    clinicSettings,
    status,
  };
}
