
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCertificates, getCertificateById } from "@/store/api/api";

export interface CertificateState {
  data: { id: number; file_name: string }[];
  loading: boolean;
  error: string | null;
  fileName: string;
}

const initialState: CertificateState = {
  data: [],
  loading: false,
  error: null,
  fileName: "",
};

export const fetchCertificates = createAsyncThunk(
  "certificate/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCertificates(); 
      return response;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);


export const fetchCertificateById = createAsyncThunk(
  "certificate/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const { pdfData, fileName } = await getCertificateById(id);

      return { fileName };

      
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch certificate"
      );
    }
  }
);


const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    clearSelectedCertificate: (state) => {
      state.fileName = "";
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchCertificates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchCertificateById.fulfilled, (state, action) => {
        state.loading = false;
        state.fileName = action.payload.fileName;
      })
      .addCase(fetchCertificateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.fileName = "";
      });
  },
});

export const { clearSelectedCertificate } = certificateSlice.actions;
export default certificateSlice.reducer;
