
import { getAllBanners } from "@/store/api/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Banner {
  id: number;
  title: string;
  image: string; 
  description?: string;
}


export const fetchBanners = createAsyncThunk<Banner[], void, { rejectValue: string }>(
  "banners/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllBanners();
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Failed to fetch banners");
    }
  }
);

interface BannerState {
  banners: Banner[];
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
      .addCase(fetchBanners.fulfilled, (state, action: PayloadAction<Banner[]>) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Failed to fetch banners";
      });
  },
});

export default bannerSlice.reducer;
