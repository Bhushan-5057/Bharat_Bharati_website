// store/redux/slices/testimonialSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTestimonials } from "@/store/api/api";

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchAll",
  async () => {
    return await getAllTestimonials();
  }
);

interface TestimonialState {
  testimonials: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialState = {
  testimonials: [],
  loading: false,
  error: null,
};

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch testimonials";
      });
  },
});

export default testimonialSlice.reducer;
