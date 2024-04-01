import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    cleanUser: (state) => {
      state.user = {};
    },
  },
});

export const { addUser, cleanUser } = CartSlice.actions;

export default CartSlice.reducer;
