import {API_LOADING, API_LOADING_SUCCESS, API_LOADING_FAILURE} from "./globalTypes";
import {LOGIN_USER} from "../User/userTypes";

export const apiLoading = () => {
    return {
        type: API_LOADING
    }
};

export const apiLoadingSuccess = () => {
    return {
        type: API_LOADING_SUCCESS
    }
};

export const apiLoadingFailure = () => {
    return {
        type: API_LOADING_FAILURE
    }
};

