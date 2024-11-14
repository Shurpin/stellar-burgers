import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { fetchOrderBurgerApi } from './orderSlice';

interface BurgerConstructorState {
  bun: null | TConstructorIngredient;
  ingredients: TConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBurgerConstructorIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients = [...state.ingredients, action.payload];
      }
    },
    removeBurgerConstructorIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item, index) => index !== action.payload
      );
    },
    moveToIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      function array_move(arr: any[], old_index: number, new_index: number) {
        if (new_index >= arr.length) {
          var k = new_index - arr.length + 1;
          while (k--) {
            arr.push(undefined);
          }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
      }

      state.ingredients = array_move(
        state.ingredients,
        action.payload.fromIndex,
        action.payload.toIndex
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchOrderBurgerApi.fulfilled,
      (state: BurgerConstructorState, action) => {
        state.bun = null;
        state.ingredients = [];
      }
    );
  },
  selectors: {
    selectBurgerConstructor: (sliceState) => sliceState
  }
});

export const { selectBurgerConstructor } = burgerConstructorSlice.selectors;
export const {
  addBurgerConstructorIngredient,
  removeBurgerConstructorIngredient,
  moveToIngredient
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
