import { getAllMembers } from "@/store/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Member {
    id: number;
    name: string;
    designation: string | null;
    category: string;
}

interface MembersState {
    members: Member[];
    loading: boolean;
    error: string | null;
}

const initialState: MembersState = {
    members: [],
    loading: false,
    error: null,
};

export const fetchMembers = createAsyncThunk("members/fetchAll", async () => {
    const data = await getAllMembers();
    return data;
});

const membersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.members = action.payload || [];
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch members";
            });
    },
});

export default membersSlice.reducer;
