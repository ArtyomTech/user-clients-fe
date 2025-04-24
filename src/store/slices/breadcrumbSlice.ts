import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BreadcrumbItem {
  title: string;
  path?: string;
}

interface BreadcrumbState {
  items: BreadcrumbItem[];
}

const initialState: BreadcrumbState = {
  items: [],
};

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    setBreadcrumbs(state, action: PayloadAction<BreadcrumbItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { setBreadcrumbs } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
