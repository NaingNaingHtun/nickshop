import { createSlice } from "@reduxjs/toolkit";
const wishListSlice = createSlice({
  name: "wishList",
  initialState: { list: [] },
  reducers: {
    addItem: (state, action) => {
      state.list.push(action.payload);
    },
    removeItem: (state, action) => {
      state.list = state.list.filter(
        (product) => product._id !== action.payload._id
      );
    },
    emptyList: (state) => {
      state.list = [];
    },
  },
});

export const { addItem, removeItem, emptyList } = wishListSlice.actions;
export default wishListSlice.reducer;
