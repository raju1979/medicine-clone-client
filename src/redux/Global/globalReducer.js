import {API_LOADING, API_LOADING_SUCCESS, API_LOADING_FAILURE} from "./globalTypes";


const initialState = {
    loading: false
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_LOADING:
            return{
                ...state,
                loading: true
            }
        case API_LOADING_SUCCESS:
                return {
                    ...state,
                    loading: false
                }
        case API_LOADING_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};

export default globalReducer;
