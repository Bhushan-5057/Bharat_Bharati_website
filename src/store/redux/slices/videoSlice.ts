// store/redux/slices/videoSlice.ts
import { getAllVideos, getVideoById } from "@/store/api/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";



interface Video {
  id: number;
  description: string;
  youtube_url: string;
  creator: {
    id: number;
    name: string;
  };
}

interface VideoState {
  videos: Video[];
  selectedVideo?: Video;
  loading: boolean;
  error?: string;
}

const initialState: VideoState = {
  videos: [],
  selectedVideo: undefined,
  loading: false,
  error: undefined,
};

// Fetch all videos
export const fetchAllVideos = createAsyncThunk(
  "videos/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllVideos();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch single video by ID
export const fetchVideoById = createAsyncThunk(
  "videos/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await getVideoById(id);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    clearSelectedVideo(state) {
      state.selectedVideo = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllVideos
      .addCase(fetchAllVideos.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action: PayloadAction<Video[]>) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchVideoById
      .addCase(fetchVideoById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchVideoById.fulfilled, (state, action: PayloadAction<Video>) => {
        state.loading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedVideo } = videoSlice.actions;
export default videoSlice.reducer
