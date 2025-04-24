import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "../../models/client";
import { fetchClients } from "../thunks/clientThunk";

interface ClientState {
  clients: Client[];
  selectedClient: Client | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  selectedClient: null,
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setSelectedClient(state, action: PayloadAction<Client>) {
      state.selectedClient = action.payload;
    },
    clearSelectedClient(state) {
      state.selectedClient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchClients.fulfilled,
        (state, action: PayloadAction<Client[]>) => {
          state.clients = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load clients";
      });
  },
});

export const { setSelectedClient, clearSelectedClient } = clientSlice.actions;

export default clientSlice.reducer;
