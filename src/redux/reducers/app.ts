import { AUTH_METHOD, REDUX_ACTIONS } from "@/src/app/constants";

const INIT_STATE = {
    auth: {type: AUTH_METHOD.LOCAL},
    user: undefined,
    settings: {},
    time: undefined
};

export const AppReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case REDUX_ACTIONS.SET_USER: {
            return {...state, user: action.payload};
        }
        case REDUX_ACTIONS.SET_AUTH: {
            return {...state, auth: action.payload};
        }
        case REDUX_ACTIONS.SET_SETTING: {
            return {...state, settings: action.payload};
        }
        case REDUX_ACTIONS.SET_TIME: {
            return {...state, time: null};
        }
        default:
            return state;
    }
};
