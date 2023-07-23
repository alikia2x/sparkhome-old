import {UPDATE_SETTINGS} from "./types";

export const updateSettings = (settings) => {
    return {
        type: UPDATE_SETTINGS,
        payload: settings,
    };
};