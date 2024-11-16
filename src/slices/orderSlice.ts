import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TOrdersResponse
} from '@api';
import { TOrder } from '@utils-types';

interface OrderListState {
  order: TOrder | null;
  orderIsLoading: boolean;
  userOrders: TOrder[];
  userOrdersIsLoading: boolean;
  orderBurger: TOrder | null;
  orderBurgerIsLoading: boolean;
  ordersByNumberApi: TOrder | null;
  isLoadingOrderByNumberApi: boolean;
}

const initialState: OrderListState = {
  order: null,
  orderIsLoading: false,
  userOrders: [],
  userOrdersIsLoading: false,
  orderBurger: null,
  orderBurgerIsLoading: false,
  ordersByNumberApi: null,
  isLoadingOrderByNumberApi: false
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

export const fetchGetOrderByNumberApi = createAsyncThunk(
  'order/getOrderByNumberApi',
  async (orderId: number) => getOrderByNumberApi(orderId)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderBurgerData: (state) => {
      state.orderBurger = null;
    }
  },
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
        state.orderBurger = action.payload.order;
        state.orderBurgerIsLoading = false;
      }
    );
    builder.addCase(
      fetchOrderBurgerApi.rejected,
      (state: OrderListState, action) => {
        state.orderBurgerIsLoading = false;
      }
    );
    // просмотр заказа пользователя
    builder.addCase(
      fetchGetOrderByNumberApi.pending,
      (state: OrderListState) => {
        state.isLoadingOrderByNumberApi = true;
      }
    );
    builder.addCase(
      fetchGetOrderByNumberApi.fulfilled,
      (state: OrderListState, action) => {
        state.ordersByNumberApi = action.payload.orders[0];
        state.isLoadingOrderByNumberApi = false;
      }
    );
    builder.addCase(
      fetchGetOrderByNumberApi.rejected,
      (state: OrderListState, action) => {
        state.isLoadingOrderByNumberApi = false;
      }
    );
  },
  selectors: {
    selectOrderData: (sliceState) => sliceState.order,
    selectUserOrders: (sliceState) => sliceState.userOrders,
    selectOrderIsLoading: (sliceState) => sliceState.orderIsLoading,
    orderBurger: (sliceState) => sliceState.orderBurger,
    selectOrderBurgerIsLoading: (sliceState) => sliceState.orderBurgerIsLoading,
    selectOrdersByNumberApi: (sliceState) => sliceState.ordersByNumberApi
  }
});

export const {
  selectOrderData,
  selectOrderIsLoading,
  selectUserOrders,
  orderBurger,
  selectOrderBurgerIsLoading,
  selectOrdersByNumberApi
} = orderSlice.selectors;
export const { clearOrderBurgerData } = orderSlice.actions;

export default orderSlice.reducer;
