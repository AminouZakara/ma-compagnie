import { createSlice } from "@reduxjs/toolkit";

export const SavedSlice = createSlice({
    name: "Bookings",
    initialState: {
        allBooking: [],
    },
    reducers: {
        savedTicket: (state, action) => {
            state.allBooking.push({ ...action.payload })
        }
    }



});

export const { savedTicket } = SavedSlice.actions;
export default SavedSlice.reducer;