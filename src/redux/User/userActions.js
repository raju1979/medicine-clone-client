import {LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, SIGNUP_USER, SIGNUP_USER_FAILURE,SIGNUP_USER_SUCCESS, SIGNUP_EMAIL_CONFIRM, SIGNUP_EMAIL_CONFIRM_FAILURE, SIGNUP_EMAIL_CONFIRM_SUCCESS, LOGOUT_USER } from './userTypes';
import {API_LOADING, API_LOADING_SUCCESS, API_LOADING_FAILURE} from "../Global/globalTypes";

import {apiLoading, apiLoadingFailure} from '../Global/globalActions';

import axios from 'axios';

import {history} from '../../history';
import {apiLoadingSuccess} from "..";

import fire from '../../firebase';

import firebase from 'firebase';


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const loginUser = (user) => {
    console.log(user)
    return {
        type: LOGIN_USER
    }
};

export const loginUserSuccess = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    }
};
export const loginUserFailure = (err) => {
    return {
        type: LOGIN_USER_FAILURE,
        payload: err
    }
};

export const logoutUser = () => {
    localStorage.removeItem('user');
    history.push('/login');
    return {
        type: LOGOUT_USER,
    }
}


export const signupUser = (user) => {
    console.log(user);
    return {
        type: SIGNUP_USER
    }
};


export const signupUserSuccess = (user) => {
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: user
    }
};
 /* failure not written yet*/

 export const signupUserFailure = (err) => {
    return {
        type: SIGNUP_USER_FAILURE,
        payload: err
    }
};


export const signupEmail = () => {
    return {
        type: SIGNUP_EMAIL_CONFIRM
    }
};

export const signupEmailSuccess = (user) => {
    return {
        type: SIGNUP_EMAIL_CONFIRM_SUCCESS,
        payload: user
    }
};


export const signupNewUser = (userSignup) => {
    console.log(userSignup)
    return (dispatch) => {

        dispatch(signupUser(userSignup));
        dispatch(apiLoading());

        fire.auth().createUserWithEmailAndPassword(userSignup.email, userSignup.password).then(response => {
            console.log(response)
            const user = {
                name: response.user.displayName || response.user.email,
                email: response.user.email,
                emailVerified: response.emailVerified,
                photoURL: response.photoURL
            };
            console.log(user);
            dispatch(signupUserSuccess(user));
            dispatch(apiLoadingFailure());
        }).catch(err => {
            console.log(err);
            if(err.code === "auth/user-not-found") {
                dispatch(signupUserFailure(err));
                dispatch(apiLoadingFailure())
            }
        })
    }
};

export const signUpEmailConfirm = (token) => {
    console.log(token)
    return (dispatch) => {
        dispatch(signupEmail(token));
        axios.post('/api/account-activation', token)
            .then(response => {
                const signupMessage = response.data;
                console.log(signupMessage);
                dispatch(signupEmailSuccess(signupMessage.user));
                history.push('/login');
            }).catch(err => {
            const errorMsg = err.message;
            console.log(errorMsg)
            // dispatch(fetchUsersFailure(err));
        })
    }
}


 // Method that trigger on Login Button click
export const fetchUser = (userLogin) => {
    console.log(userLogin)
    return (dispatch) => {
        dispatch(loginUser(userLogin));
        dispatch(apiLoading());
        fire.auth().signInWithEmailAndPassword(userLogin.email, userLogin.password)
        .then(response => {
            console.log(response)
            const user = {
                name: response.user.displayName || response.user.email,
                email: response.user.email,
                emailVerified: response.user.emailVerified,
                photoURL: response.user.photoURL
            };
            console.log('user data to login', user)
            dispatch(loginUserSuccess(user));
            dispatch(apiLoadingFailure());
        }).catch(err => {
            console.log(err);
            dispatch(loginUserFailure(err));
            dispatch(apiLoadingFailure())
        })
        
    }
};

