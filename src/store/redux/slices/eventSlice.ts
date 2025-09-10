import { getAllIntegrations } from "@/store/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Integration {
  id: number;
  title: string;
  description: string;
  file_name: string;
  data?: string;
}

interface IntegrationState {
  integrations: Integration[];
  loading: boolean;
  error: string | null;
}

const initialState: IntegrationState = {
  integrations: [],
  loading: false,
  error: null,
};

// Fetch data
export const fetchIntegrations = createAsyncThunk(
  "integrations/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllIntegrations();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch integrations");
    }
  }
);

const integrationSlice = createSlice({
  name: "integrations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIntegrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIntegrations.fulfilled, (state, action) => {
        state.loading = false;
        state.integrations = action.payload;
      })
      .addCase(fetchIntegrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default integrationSlice.reducer;
