import {FETCH_MEDICINES, FETCH_MEDICINES_SUCCESS, FETCH_MEDICINES_FAILURE} from './medicineTypes';

const initialState = {
    medicines: [],
    lastVisible:'',
    firstVisible: '',
    err: ''
}

const medicineReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MEDICINES:
            return {
                ...state,
                err: ''
            }
        case FETCH_MEDICINES_SUCCESS:
            return {
                medicines: action.payload.medicines,
                paginationObj: action.payload.paginationObj,
                err: ''
            }
        case FETCH_MEDICINES_FAILURE:
            return {
                ...state,
                err: action.payload
            }
        default:
            return state
    }

}

export default medicineReducer;
