import { createAsyncThunk } from "@reduxjs/toolkit";
import { Client } from "../../models/client";
import axiosInstance from "../../axios/axiosInstance";

export const fetchClients = createAsyncThunk<Client[], number>(
  "client/fetchClients",
  async (userId: number) => {
    const response = await axiosInstance.get(`/client/user/${userId}`);
    return response.data;
  }
);
