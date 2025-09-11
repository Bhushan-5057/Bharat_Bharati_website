import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllSchools, getSchoolById } from "@/store/api/api";

export const fetchSchools = createAsyncThunk("schools/fetchAll", async () => {
  return await getAllSchools();
});

export const fetchSchoolById = createAsyncThunk(
  "schools/fetchById",
  async (id: number) => {
    return await getSchoolById(id);
  }
);

interface SchoolState {
  schools: any[];
  schoolDetail: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: SchoolState = {
  schools: [],
  schoolDetail: null,
  loading: false,
  error: null,
};

const schoolSlice = createSlice({
  name: "schools",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = action.payload;
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch schools";
      })

      .addCase(fetchSchoolById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolById.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolDetail = action.payload;
      })
      .addCase(fetchSchoolById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch school detail";
      });
  },
});

export default schoolSlice.reducer;
