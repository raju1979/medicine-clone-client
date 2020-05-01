import {
    LOGIN_USER,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    SIGNUP_USER,
    SIGNUP_USER_FAILURE,
    SIGNUP_USER_SUCCESS,
    SIGNUP_EMAIL_CONFIRM,
    SIGNUP_EMAIL_CONFIRM_FAILURE,
    SIGNUP_EMAIL_CONFIRM_SUCCESS,
    LOGOUT_USER
} from "./userTypes";


const initialState = {
    user: {},
    loading: false,
    error: '',
    userDetail: {},
    loggedIn: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER:
            return {
                user: {},
                loading: true,
                error: '',
                userDetail: {},
                loggedIn: false
            }
        case LOGIN_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: '',
                loggedIn: true
            }
        case LOGIN_USER_FAILURE:
            return {
                loading: false,
                user: {},
                error: action.payload,
                loggedIn: false
            }
        case SIGNUP_USER:
            return {
                ...state,
                loading: true
            }
        case SIGNUP_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: ''
            }
        case SIGNUP_EMAIL_CONFIRM:
            return {
                ...state,
                loading: true
            }
        case SIGNUP_EMAIL_CONFIRM_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetail: action.payload
            }
        default: return state
    }
};

export default userReducer
