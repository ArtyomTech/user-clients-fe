import { createAsyncThunk } from "@reduxjs/toolkit";
import { Country } from "../../models/country";
import axiosInstance from "../../axios/axiosInstance";

export const fetchCountries = createAsyncThunk<Country[]>(
  "country/fetchCountries",
  async () => {
    const response = await axiosInstance.get("/country");
    return response.data;
  }
);
