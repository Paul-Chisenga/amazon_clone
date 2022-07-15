import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BusketState {
  items: any[];
}

const initialState: BusketState = {
  items: [],
};

export const busketSlice = createSlice({
  name: "busket",
  initialState,
  reducers: {
    addToBusket: (state, action) => {},
    removeFromBusket: (state, action) => {},
  },
});

// actions
export const { addToBusket, removeFromBusket } = busketSlice.actions;

// selectors
export const selectItems = (state: RootState) => state.busket.items;

// reducer
export default busketSlice.reducer;
