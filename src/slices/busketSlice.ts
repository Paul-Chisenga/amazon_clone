import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../components/Product";
import { RootState } from "../store";

interface BusketState {
  items: ProductType[];
}

const initialState: BusketState = {
  items: [],
};

export const busketSlice = createSlice({
  name: "busket",
  initialState,
  reducers: {
    addToBusket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBusket: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

// actions
export const { addToBusket, removeFromBusket } = busketSlice.actions;

// selectors
export const selectItems = (state: RootState) => state.busket.items;
export const selectTotal = (state: RootState) =>
  state.busket.items.reduce((total, item) => total + item.price, 0);

// reducer
export default busketSlice.reducer;
