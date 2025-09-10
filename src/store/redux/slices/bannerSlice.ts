import { getAllBanners } from "@/store/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const fetchBanners = createAsyncThunk("banners/fetchAll", async () => {
  return await getAllBanners();
});

interface BannerState {
  banners: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  banners: [],
  loading: false,
  error: null,
};

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch banners";
      });
  },
});

export default bannerSlice.reducer;
