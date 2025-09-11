import { getAllCities } from "@/store/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface City {
  id: number;
  name: string;
}

interface CityState {
  cities: City[];
  loading: boolean;
  error: string | null;
}

const initialState: CityState = {
  cities: [],
  loading: false,
  error: null,
};

// ✅ Async thunk for fetching cities
export const fetchCities = createAsyncThunk("cities/fetchAll", async () => {
  const data = await getAllCities();
  return data;
});

const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cities";
      });
  },
});

export default citySlice.reducer;
