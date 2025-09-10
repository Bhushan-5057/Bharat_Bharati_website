import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFeatures } from "@/store/api/api";

export const fetchFeatures = createAsyncThunk(
  "features/fetchAll",
  async () => {
    return await getAllFeatures();
  }
);

interface FeatureState {
  features: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FeatureState = {
  features: [],
  loading: false,
  error: null,
};

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.features = action.payload;
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch features";
      });
  },
});

export default featuresSlice.reducer;
