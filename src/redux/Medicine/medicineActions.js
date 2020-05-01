import {FETCH_MEDICINES, FETCH_MEDICINES_SUCCESS, FETCH_MEDICINES_FAILURE} from './medicineTypes';
import {apiLoading, apiLoadingFailure} from '../Global/globalActions';

import API from '../../utils/API';

export const fetchMedicines = () => {
    return {
        type: FETCH_MEDICINES
    }
}

export const fetchMedicinesSuccess = (medicines, lastVisible, firstVisible) => {
    return {
        type: FETCH_MEDICINES_SUCCESS,
        payload: {medicines,lastVisible, firstVisible}
    }
}

export const fetchMedicinesFailure = (err) => {
    return {
        type: FETCH_MEDICINES_FAILURE,
        payload: err
    }
}


export const getMedicines = (options={}) => {
    console.log('OPTIONS:::', options)
    return (dispatch, getState, { getFirestore }) => {
        dispatch(fetchMedicines());
        dispatch(apiLoading());
        const firestore = getFirestore();
        let query;
        let lastVisible;
        let firstVisible;
        if(options.first) {
            query = firestore.collection("medicines")
                    .orderBy('med_name')
                    .limit(25)
                    .get();
        } else if(!options.first && options.forward) {
            query = firestore.collection("medicines")                    
                    .orderBy('med_name')
                    .startAfter(options.lastDoc)
                    .limit(25)
                    .get();
        } else if(!options.first && !options.forward) {
            query = firestore.collection("medicines")                    
                    .orderBy('med_name')
                    .endAt(options.lastDoc)
                    .limit(25)
                    .get();
        }
        query.then((querySnapshot) => {
            console.log(querySnapshot.docs.length);
            lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
            firstVisible = querySnapshot.docs[0]
            let medicinesArray = [];
            querySnapshot.forEach((doc) => {
                console.log('DOC IS', doc);
                console.log(`${doc.id} => ${doc.data()}`);
                medicinesArray.push({ ...doc.data(), id: doc.id })
            });
            console.log(medicinesArray);
            dispatch(apiLoadingFailure())
            dispatch(fetchMedicinesSuccess(medicinesArray,lastVisible, firstVisible))
        }).catch(err => {
            dispatch(apiLoadingFailure());
            dispatch(fetchMedicinesFailure(err))
        });        
    }
};


// export const getMedicines = (options={}) => {
//     API.get('/', {
//         params: {
//             alphabet: 'A'
//         }
//     }).then(data => {
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     })
// }