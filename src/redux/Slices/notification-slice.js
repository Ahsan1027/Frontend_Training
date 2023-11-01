import { createSlice } from '@reduxjs/toolkit';

const NotificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        orderDeliveredNotification: [],
        loading: false,
        error: null,
    },

    reducers: {
        clearNotifications: (state) => {
            state.notifications = [];
        },
        addNotifications: (state, action) => {
            state.notifications = [...state.notifications, action.payload];
        },
        addUserNotification: (state, action) => {
            console.log('check action payload',action.payload);
            state.orderDeliveredNotification = [...state.orderDeliveredNotification, action.payload];
            console.log('check addUserNotification',state.orderDeliveredNotification);
        },
        clearUserNotifications: (state) => {
            state.orderDeliveredNotification= [];
        },
    },
});

export const { clearNotifications, addNotifications, addUserNotification, clearUserNotifications } = NotificationSlice.actions;
export default NotificationSlice.reducer;
