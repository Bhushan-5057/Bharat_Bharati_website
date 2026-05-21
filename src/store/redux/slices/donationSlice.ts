import { getAllDonations } from "@/store/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export interface Donation {
  id: number;
  account_holder_name: string;
  account_number: string;
  bank_name: string;
  ifsc_code: string;
  upi_id: string;
  file_name: string;
  data: string;
}

interface DonationState {
  donations: Donation[];
  loading: boolean;
  error: string | null;
}

const initialState: DonationState = {
  donations: [],
  loading: false,
  error: null,
};

export const fetchDonations = createAsyncThunk("donations/fetchAll", async () => {
  const data = await getAllDonations();
  return data;
});

const donationSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch donations";
      });
  },
});

export default donationSlice.reducer;
