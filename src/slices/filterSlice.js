import { createSlice } from "@reduxjs/toolkit";
const filterSlice = createSlice({
  name: "filter",
  initialState: {
    category: null,
    for: null,
    size: null,
    sorting: null,
  },
  reducers: {
    //clearing the filter state
    clearFilter: (state) => {
      state.size = "";
      state.for = "";
      state.category = "";
    },
    //update the filter state
    updateFilter: (state, action) => {
      state.size = action.payload.size;
      state.sorting = action.payload.sorting;
      state.for = action.payload.for;
      state.category = action.payload.category;
    },
  },
});
export const { updateFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
