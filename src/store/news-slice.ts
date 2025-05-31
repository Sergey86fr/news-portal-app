import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { format } from "date-fns";
import { fetchNews, type INewsItem } from "../api/news-api";

interface NewsState {
  items: { [date: string]: INewsItem[] };
  currentDate: string;
  loading: boolean;
  error: string | null;
  lastFetchedMonth: string | null;
}

const initialState: NewsState = {
  items: {},
  currentDate: new Date().toISOString(),
  loading: false,
  error: null,
  lastFetchedMonth: null,
};

export const loadNewsForMonth = createAsyncThunk(
  "news/loadForMonth",
  async (dateStr: string, { rejectWithValue }) => {
    try {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (date > new Date()) {
        return rejectWithValue("Cannot load future dates");
      }

      return await fetchNews(year, month);
    } catch (error) {
      console.log(error);

      return rejectWithValue("Failed to fetch news");
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    addNewItems: (state, action: PayloadAction<INewsItem[]>) => {
      action.payload.forEach((item) => {
        const dateKey = format(new Date(item.pub_date), "yyyy-MM-dd");
        if (!state.items[dateKey]) {
          state.items[dateKey] = [];
        }

        const exists = state.items[dateKey].some(
          (i) => i.web_url === item.web_url
        );
        if (!exists) {
          state.items[dateKey].push(item);
        }
      });
    },
    resetLastFetched: (state) => {
      state.lastFetchedMonth = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNewsForMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNewsForMonth.fulfilled, (state, action) => {
        state.loading = false;

        const monthKey = `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }`;
        state.lastFetchedMonth = monthKey;

        action.payload.forEach((item) => {
          const dateKey = format(new Date(item.pub_date), "yyyy-MM-dd");
          if (!state.items[dateKey]) {
            state.items[dateKey] = [];
          }

          const exists = state.items[dateKey].some(
            (i) => i.web_url === item.web_url
          );
          if (!exists) {
            state.items[dateKey].push(item);
          }
        });
      })
      .addCase(loadNewsForMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to load news";
      });
  },
});

export const { setCurrentDate, addNewItems, resetLastFetched } =
  newsSlice.actions;
export default newsSlice.reducer;
