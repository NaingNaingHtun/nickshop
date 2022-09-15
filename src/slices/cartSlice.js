import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    //clearing the shopping cart
    clearCart: (state) => {
      state.products = [];
    },
    //add a new item to the cart
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    //remove a item from the cart
    removeProduct: (state, action) => {
      const filteredProducts = state.products.filter((product) => {
        if (
          product._id === action.payload._id &&
          product.quantity === action.payload.quantity &&
          product.size === action.payload.size &&
          product.color === action.payload.color
        ) {
          return false; //remove from the filtering
        } else {
          return true; //let the other products
        }
      });
      state.products = filteredProducts;
    },
    //updat the quantity of the previous added items
    updateQuantity: (state, action) => {
      const { product, newQuantity } = action.payload;
      let productIndex = null;
      state.products.forEach((p, index) => {
        if (
          product._id === p._id &&
          product.quantity === p.quantity &&
          product.size === p.size &&
          product.color === p.color
        ) {
          productIndex = index;
        }
      });
      if (productIndex >= 0 && productIndex !== null) {
        state.products[productIndex].quantity = newQuantity;
      }
    },
  },
});

export const { addProduct, updateQuantity, removeProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
