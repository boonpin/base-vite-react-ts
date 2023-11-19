import createRootReducer from "../reducers";
import { configureStore } from "@reduxjs/toolkit";

const store = () => {
    return configureStore({
        reducer: createRootReducer(history)
    });
};
export default store;
