import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import firebase from '../firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore'

import{composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from "./rootReducer";

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({getFirestore})),
    reduxFirestore(firebase)
));
export default store;
