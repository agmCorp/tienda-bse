import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onAuthSuccess: false,
  onAuthLogout: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    eventOnAuthSuccess: (state, action) => {
      state.onAuthSuccess = action.payload;
    },
    eventOnAuthLogout: (state, action) => {
      state.onAuthLogout = action.payload;
    },
  },
});

const { eventOnAuthSuccess, eventOnAuthLogout } = userSlice.actions;

// Selectors
const selectOnAuthSuccess = (state) => state.user.onAuthSuccess;
const selectOnAuthLogout = (state) => state.user.onAuthLogouts;

export default userSlice.reducer;
export {
  selectOnAuthSuccess,
  selectOnAuthLogout,
  eventOnAuthSuccess,
  eventOnAuthLogout,
};
