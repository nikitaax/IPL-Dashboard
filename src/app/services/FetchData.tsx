import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// src/features/fixtures/fixturesSlice.ts

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Async thunk for fetching data
export const fetchFixtures = createAsyncThunk(
  "fixtures/fetchFixtures",
  async () => {
    const res = await fetch(`${apiUrl}/api/fixtures`);
    if (!res.ok) throw new Error("Failed to fetch fixtures");
    const data = await res.json();
    return data;
  }
);

const fixturesSlice = createSlice({
  name: "fixtures",
  initialState: {
    fixtures: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFixtures.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFixtures.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fixtures = action.payload.fixtures || [];
      })
      .addCase(fetchFixtures.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default fixturesSlice.reducer;
