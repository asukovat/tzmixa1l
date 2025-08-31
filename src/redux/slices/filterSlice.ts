import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  activeCategory: string;
  activeSort: string;
}

const initialState: FilterState = {
  activeCategory: 'Еда', 
  activeSort: 'популярности',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    setActiveSort: (state, action: PayloadAction<string>) => {
      state.activeSort = action.payload;
    }
  },
})

export const { setActiveCategory, setActiveSort } = filterSlice.actions;

export default filterSlice.reducer;