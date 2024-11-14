import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi, TOrdersResponse } from '@api';
import { TOrder } from '@utils-types';

interface OrderListState {
  order: TOrder | null;
  orderIsLoading: boolean;
  userOrders: TOrder[];
  userOrdersIsLoading: boolean;
  orderBurgerIsLoading: boolean;
}

const initialState: OrderListState = {
  order: null,
  orderIsLoading: false,
  userOrders: [],
  userOrdersIsLoading: false,
  orderBurgerIsLoading: false
};

export const fetchOrder = createAsyncThunk('order/getOrder', async () =>
  getOrdersApi()
);

export const fetchUserOrdersApi = createAsyncThunk(
  'order/getOrders',
  async () => getOrdersApi()
);

export const fetchOrderBurgerApi = createAsyncThunk(
  'order/orderBurgerApi',
  async (data: string[]) => orderBurgerApi(data)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state: OrderListState) => {
      state.orderIsLoading = true;
    });
    builder.addCase(fetchOrder.fulfilled, (state: OrderListState, action) => {
      state.orderIsLoading = false;
    });
    builder.addCase(fetchOrder.rejected, (state: OrderListState, action) => {
      state.orderIsLoading = false;
    });
    // заказы пользователя
    builder.addCase(fetchUserOrdersApi.pending, (state: OrderListState) => {
      state.userOrdersIsLoading = true;
    });
    builder.addCase(
      fetchUserOrdersApi.fulfilled,
      (state: OrderListState, action) => {
        state.userOrders = action.payload;
        state.userOrdersIsLoading = false;
      }
    );
    builder.addCase(
      fetchUserOrdersApi.rejected,
      (state: OrderListState, action) => {
        state.userOrdersIsLoading = false;
      }
    );
    // оформить заказ
    builder.addCase(fetchOrderBurgerApi.pending, (state: OrderListState) => {
      state.orderBurgerIsLoading = true;
    });
    builder.addCase(
      fetchOrderBurgerApi.fulfilled,
      (state: OrderListState, action) => {
        console.log('slice fetchOrderBurgerApi action.payload', action.payload);
        state.orderBurgerIsLoading = false;
      }
    );
    builder.addCase(
      fetchOrderBurgerApi.rejected,
      (state: OrderListState, action) => {
        state.orderBurgerIsLoading = false;
      }
    );
  },
  selectors: {
    selectOrderData: (sliceState) => sliceState.order,
    selectUserOrders: (sliceState) => sliceState.userOrders,
    selectOrderIsLoading: (sliceState) => sliceState.orderIsLoading,
    selectOrderBurgerIsLoading: (sliceState) => sliceState.orderBurgerIsLoading
  }
});

export const {
  selectOrderData,
  selectOrderIsLoading,
  selectUserOrders,
  selectOrderBurgerIsLoading
} = orderSlice.selectors;

export default orderSlice.reducer;
