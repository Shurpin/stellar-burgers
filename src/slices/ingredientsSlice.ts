import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

interface IngredientsListState {
  data: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
}

const initialState: IngredientsListState = {
  data: [],
  buns: [],
  mains: [],
  sauces: [],
  isLoading: true
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchIngredients.fulfilled,
      (state: IngredientsListState, action: PayloadAction<TIngredient[]>) => {
        const buns: TIngredient[] = [];
        const mains: TIngredient[] = [];
        const sauces: TIngredient[] = [];
        action.payload.forEach((item) => {
          if (item.type === 'main') {
            mains.push(item);
          }
          if (item.type === 'sauce') {
            sauces.push(item);
          }
          if (item.type === 'bun') {
            buns.push(item);
          }
        });
        // Add user to the state array
        state.data = action.payload;
        state.buns = buns;
        state.mains = mains;
        state.sauces = sauces;
        state.isLoading = false;
      }
    );
  },
  selectors: {
    selectIngredients: (sliceState) => sliceState.data,
    selectIngredientsBuns: (sliceState) => sliceState.buns,
    selectIngredientsMains: (sliceState) => sliceState.mains,
    selectIngredientsSauces: (sliceState) => sliceState.sauces,
    selectIsLoadingIngredients: (sliceState) => sliceState.isLoading
  }
});

export const {
  selectIngredients,
  selectIsLoadingIngredients,
  selectIngredientsBuns,
  selectIngredientsMains,
  selectIngredientsSauces
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
