import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customRol: "",
};

const rolSlice = createSlice({
  name: "rol",
  initialState,
  reducers: {
    assignCustomRol: (state, action) => {
      state.customRol = action.payload;
    },
  },
});

const { assignCustomRol } = rolSlice.actions;

// Selectors
const selectCustomRol = (state) => state.rol.customRol;

export default rolSlice.reducer;
export { assignCustomRol, selectCustomRol };
