import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notification';

export default configureStore({
    reducer: {
        notification: notificationReducer,
    },
});
