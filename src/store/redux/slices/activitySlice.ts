import { getActivityById, getAllActivities } from "@/store/api/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Activity {
  id: number;
  title: string;
  description: string;
  file_name: string;
  data: string;
  imageUrl?: string;
  created_by?: number;
  creator?: { id: number; name: string };
}

interface ActivityState {
  activities: Activity[];
  selectedActivity: Activity | null;
  loading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  activities: [],
  selectedActivity: null,
  loading: false,
  error: null,
};


export const fetchAllActivities = createAsyncThunk<
  Activity[], 
  void,       
  { rejectValue: string }
>("activities/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await getAllActivities();
    return response.map((a: Activity) => ({
      ...a,
      imageUrl: `data:image/png;base64,${a.data}`,
    }));
  } catch (err: unknown) {
    if (err instanceof Error) return rejectWithValue(err.message);
    return rejectWithValue("An unknown error occurred");
  }
});


export const fetchActivityById = createAsyncThunk<
  Activity, 
  number,   
  { rejectValue: string }
>("activities/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await getActivityById(id);
    return response;
  } catch (err: unknown) {
    if (err instanceof Error) return rejectWithValue(err.message);
    return rejectWithValue("An unknown error occurred");
  }
});

const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllActivities.fulfilled, (state, action: PayloadAction<Activity[]>) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchAllActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch activities";
      })

      .addCase(fetchActivityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityById.fulfilled, (state, action: PayloadAction<Activity>) => {
        state.loading = false;
        state.selectedActivity = action.payload;
      })
      .addCase(fetchActivityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch activity";
      });
  },
});

export default activitySlice.reducer;
