import { createSlice } from "@reduxjs/toolkit";

type selectPriceRange = {
  minPrice: number;
  maxPrice: number;
};
const initialState: selectPriceRange = {
  minPrice: 300,
  maxPrice: 0,
};
const priceRangeSlice = createSlice({
  name: "priceRange",
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
  },
});
export const { setPriceRange } = priceRangeSlice.actions;
export default priceRangeSlice.reducer;
