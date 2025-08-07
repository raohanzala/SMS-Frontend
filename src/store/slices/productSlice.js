import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [23,23,23,23]  
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    set_notifications: (state, { payload }) => {  
      state.notifications.push(payload.notifications);
    },
    remove_notification: (state, { payload }) => {
      state.notifications = state.notifications.filter(
        (item) => item.orderId !== payload.notificationId
      );
    },
    clear_notifications: (state) => {
      state.notifications = state.initialState;
    },
  },
});

export const {  } = productSlice.actions;

export default productSlice.reducer;
