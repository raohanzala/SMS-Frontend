import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: []
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    set_notifications: (state, { payload }) => {
      console.log(payload, 'PAYLOAD NOTIFICATION')
      console.log(state, 'PAYLOAD NOTIFICATION')

      if (!state.notifications) {
        state.notifications = []; // Ensure it's always an array
      }

      state.notifications.unshift(payload);

    },
    remove_notification: (state, { payload }) => {
      console.log('Notificatioin remove --->', payload)
      state.notifications = state.notifications.filter(
        (item) => item.orderId !== payload.orderId
      );
    },
    clear_notifications: (state) => {
      state.notifications = state.initialState;
    },
  },
});

export const { set_notifications, remove_notification, clear_notifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
