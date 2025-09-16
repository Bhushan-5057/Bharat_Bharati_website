import { getAllBlogs, getBlogBySlug } from "@/store/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const fetchAllBlogsThunk = createAsyncThunk(
    "blog/fetchAll",
    async () => {
        return await getAllBlogs();
    }
);

export const fetchBlogBySlugThunk = createAsyncThunk(
    "blog/fetchBySlug",
    async (slug:string) => {
        return await getBlogBySlug(slug);
    }
);

interface BlogsState {
    blogs: any[];
    selectedBlog: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: BlogsState = {
    blogs: [],
    selectedBlog: null,
    loading: false,
    error: null,
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBlogsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllBlogsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchAllBlogsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch blogs";
            })
            .addCase(fetchBlogBySlugThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedBlog = null;
            })
            .addCase(fetchBlogBySlugThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBlog = action.payload;
            })
            .addCase(fetchBlogBySlugThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch blog";
            });
    },
});

export default blogSlice.reducer;
