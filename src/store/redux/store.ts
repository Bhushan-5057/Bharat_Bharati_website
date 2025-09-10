import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./slices/bannerSlice"
import fetchReducer from "./slices/featuresSlice"
import testimonialReducer from "./slices/testimonialSlice"
import appointmentReducer from "./slices/appointmentSlice"
import certificateReducer from "./slices/certificateSlice ";
import integrationReducer from "@/store/redux/slices/eventSlice";

export const store = configureStore({
  reducer: {
    banners: bannerReducer,
    features:fetchReducer,
    testimonials: testimonialReducer,
    appointment:appointmentReducer,
   certificate: certificateReducer,
     integrations: integrationReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
