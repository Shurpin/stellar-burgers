import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

interface IngredientsListState {
  data: TIngredient[];
  isLoading: boolean;
}

const initialState: IngredientsListState = {
  data: [],
  isLoading: true
};

export const fetchTracks = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const { id } = action.payload;
      console.log(id, state);

      // state.tracks = state.tracks.map((item) => {
      //   if (item.id === id) {
      //     return { ...item, isLiked: !item.isLiked };
      //   }
      //
      //   return item;
      // });
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchTracks.fulfilled,
      (state: IngredientsListState, action: PayloadAction<TIngredient[]>) => {
        // Add user to the state array
        state.data = action.payload;
        state.isLoading = false;
      }
    );
  },
  selectors: {
    selectIngredients: (sliceState) => sliceState.data,
    selectIsLoadingIngredients: (sliceState) => sliceState.isLoading
  }
});

export const { selectIngredients, selectIsLoadingIngredients } =
  ingredientsSlice.selectors;
// export const { toggleLike } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
