import { configureStore } from "@reduxjs/toolkit";
import connectionSlice  from "./slice";

const store = configureStore({
  reducer: {
    connection: connectionSlice,
  },
});

export default store;
