import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const fetchPoints = createAsyncThunk("points/fetchPoints", async () => {
  const res = await fetch(`${apiUrl}/api/table`);
  if (!res.ok) throw new Error("Failed to fetch points table");
  const data = await res.json();
  return data || { table: [] };
});

const pointsSlice = createSlice({
  name: "points",
  initialState: {
    table: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoints.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPoints.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.table = action.payload.table || [];
      })
      .addCase(fetchPoints.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default pointsSlice.reducer;
