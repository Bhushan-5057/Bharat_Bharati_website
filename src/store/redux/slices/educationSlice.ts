import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEducation } from "@/store/api/api";

export const fetchEducation = createAsyncThunk(
  "education/fetchAll",
  async () => {
    return await getAllEducation();
  }
);

interface EducationState {
  education: any[];
  loading: boolean;
  error: string | null;
}

const initialState: EducationState = {
  education: [],
  loading: false,
  error: null,
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.education = action.payload;
      })
      .addCase(fetchEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch education data";
      });
  },
});

export default educationSlice.reducer;
