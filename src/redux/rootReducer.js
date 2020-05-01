import {combineReducers} from 'redux';
import { firestoreReducer } from 'redux-firestore'

import userReducer from './User/userReducer';
import globalReducer from "./Global/globalReducer";
import medicineReducer from "./Medicine/medicineReducer";
import cartReducer from "./Cart/cartReducer";

const appReducer  = combineReducers({
    user: userReducer,
    global: globalReducer,
    medicines: medicineReducer,
    firestorMedicines: firestoreReducer,
    cart: cartReducer
})


// const rootReducer = combineReducers({
//     user: userReducer,
//     global: globalReducer,
//     burger: burgerReducer
// });

// Below code will reset the app

const rootReducer = (state, action) => {
    if(action.type === 'LOGOUT_USER') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;
