import { createSlice } from "@reduxjs/toolkit";
export const slice = createSlice({
    name: "notification",
    initialState: {
        message: " "
    },
    reducers: {
        success: (state) => {
            state.message = "Successfully retrieved CSV file";
        },
        failure: (state) => {
            state.message = "Failed to read CSV file";
        },
    }
});

export const { success, failure } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.notification.message)`

export const selectMsg = (state) => state.notification.message;
export default slice.reducer;
