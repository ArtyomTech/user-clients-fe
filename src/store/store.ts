import { configureStore } from "@reduxjs/toolkit";
import breadcrumbReducer from "./slices/breadcrumbSlice";
import clientReducer from "./slices/clientSlice";
import countryReducer from "./slices/countrySlice";

export const store = configureStore({
  reducer: {
    breadcrumb: breadcrumbReducer,
    client: clientReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
