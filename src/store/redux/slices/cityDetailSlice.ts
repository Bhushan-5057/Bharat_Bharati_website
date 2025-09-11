import { getCityById } from "@/store/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CityDetailState {
  cityDetail: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: CityDetailState = {
  cityDetail: null,
  loading: false,
  error: null,
};

// ✅ Thunk for fetching city by id
export const fetchCityById = createAsyncThunk(
  "cityDetail/fetchById",
  async (id: number) => {
    return await getCityById(id);
  }
);

const cityDetailSlice = createSlice({
  name: "cityDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.cityDetail = null;
      })
      .addCase(fetchCityById.fulfilled, (state, action) => {
        state.loading = false;
        state.cityDetail = action.payload;
      })
      .addCase(fetchCityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch city";
      });
  },
});

export default cityDetailSlice.reducer;
