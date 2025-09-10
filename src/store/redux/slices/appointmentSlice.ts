import { createAppointment } from "@/store/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface AppointmentState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  loading: false,
  success: false,
  error: null,
};

export const submitAppointment = createAsyncThunk(
  "appointment/submit",
  async (
    formData: {
      name: string;
      email: string;
      contact_number: string;
      date: string;
      time: string;
      reason_of_meeting: string;
      your_expectation: string;
      more_details: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await createAppointment(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    resetAppointmentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAppointment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitAppointment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(submitAppointment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;
