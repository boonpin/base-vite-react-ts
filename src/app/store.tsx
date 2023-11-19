import { useDispatch, useSelector } from "react-redux";
import { REDUX_ACTIONS } from "@/src/app/constants";

export const useAppStore = () => {
    const {app} = useSelector((state: any) => state);
    const {auth, user, settings, time, version} = app;
    return {auth, user, time, settings, version};
};


export const useAppDispatch = () => {
    const dispatch = useDispatch();
    return {
        time: {
            set: (time: any) => {
                dispatch({type: REDUX_ACTIONS.SET_TIME, payload: time});
            }
        },
        settings: {
            set: (settings: any) => {
                dispatch({type: REDUX_ACTIONS.SET_SETTING, payload: settings});
            },
            unset: () => {
                dispatch({type: REDUX_ACTIONS.SET_SETTING, payload: null});
            }
        },
        user: {
            set: (user: any) => {
                dispatch({type: REDUX_ACTIONS.SET_USER, payload: user});
            },
            unset: () => {
                dispatch({type: REDUX_ACTIONS.SET_USER, payload: null});
            }
        }
    };
};
