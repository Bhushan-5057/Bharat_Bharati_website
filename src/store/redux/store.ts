import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./slices/bannerSlice";
import fetchReducer from "./slices/featuresSlice";
import testimonialReducer from "./slices/testimonialSlice";
import appointmentReducer from "./slices/appointmentSlice";
import certificateReducer from "./slices/certificateSlice ";
import integrationReducer from "@/store/redux/slices/eventSlice";
import activitieReducer from "@/store/redux/slices/activitySlice";
import educationReducer from "./slices/educationSlice";
import schoolReducer from "./slices/schoolSlice";
import cityReducer from "./slices/citySlice";
import cityDetailReducer from "./slices/cityDetailSlice";
import galleryReducer from "@/store/redux/slices/gallerySlice";
import videosReducer from "@/store/redux/slices/videoSlice";
import donationReducer from "@/store/redux/slices/donationSlice";

export const store = configureStore({
  reducer: {
    banners: bannerReducer,
    features: fetchReducer,
    testimonials: testimonialReducer,
    appointment: appointmentReducer,
    certificate: certificateReducer,
    integrations: integrationReducer,
    activities: activitieReducer,
    education: educationReducer,
    schools: schoolReducer,
    cities: cityReducer,
    cityDetail: cityDetailReducer,
    gallery: galleryReducer,
    videos: videosReducer,
    donations: donationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
