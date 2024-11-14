import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '@api';
import { TOrder } from '@utils-types';

interface FeedListState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
}

const initialState: FeedListState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true
};

export const fetchFeed = createAsyncThunk('feed/getFeeds', async () =>
  getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.pending, (state: FeedListState) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchFeed.fulfilled,
      (state: FeedListState, action: PayloadAction<TFeedsResponse>) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      }
    );
  },
  selectors: {
    selectFeedOrders: (sliceState) => sliceState.orders,
    selectFeedTotal: (sliceState) => sliceState.total,
    selectFeedTotalToday: (sliceState) => sliceState.totalToday,
    selectFeedIsLoading: (sliceState) => sliceState.isLoading
  }
});

export const {
  selectFeedOrders,
  selectFeedIsLoading,
  selectFeedTotal,
  selectFeedTotalToday
} = feedSlice.selectors;

export default feedSlice.reducer;
