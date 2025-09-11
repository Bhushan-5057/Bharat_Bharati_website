import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllImages, getImagesBId } from "@/store/api/api";


export const fetchAllGalleryImages = createAsyncThunk(
  "gallery/fetchAll",
  async () => {
    return await getAllImages();
  }
);

export const fetchGalleryImageById = createAsyncThunk(
  "gallery/fetchById",
  async (id: number) => {
    return await getImagesBId(id);
  }
);

interface GalleryState {
  images: any[];
  selectedImage: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: GalleryState = {
  images: [],
  selectedImage: null,
  loading: false,
  error: null,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGalleryImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllGalleryImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchAllGalleryImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch gallery images";
      });

    builder
      .addCase(fetchGalleryImageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryImageById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedImage = action.payload;
      })
      .addCase(fetchGalleryImageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch image by ID";
      });
  },
});

export default gallerySlice.reducer;
