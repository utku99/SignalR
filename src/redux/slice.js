import { createSlice } from "@reduxjs/toolkit";


const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    connection: null,
  } ,
  reducers: {
    setConnection: (state, action) => {
      state.connection = action.payload
    },
  },
});

export default connectionSlice.reducer;
export const { setConnection } = connectionSlice.actions;