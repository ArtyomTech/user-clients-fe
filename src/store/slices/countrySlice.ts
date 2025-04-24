import { createSlice } from "@reduxjs/toolkit";
import { Country } from "../../models/country";
import { fetchCountries } from "../thunks/countryThunk";

interface CountryState {
  countries: Country[];
  loading: boolean;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default countrySlice.reducer;
