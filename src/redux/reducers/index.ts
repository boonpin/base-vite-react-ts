import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { AppReducer } from "./app";

const createRootReducer = (history: any) =>
    combineReducers({
        router: connectRouter(history),
        app: AppReducer
    });

export default createRootReducer;
