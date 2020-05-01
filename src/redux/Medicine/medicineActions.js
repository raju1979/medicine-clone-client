import { FETCH_MEDICINES, FETCH_MEDICINES_SUCCESS, FETCH_MEDICINES_FAILURE } from './medicineTypes';
import { apiLoading, apiLoadingFailure } from '../Global/globalActions';

import API from '../../utils/API';

export const fetchMedicines = () => {
    return {
        type: FETCH_MEDICINES
    }
}

export const fetchMedicinesSuccess = (medicines, paginationObj) => {
    console.log(paginationObj)
    return {
        type: FETCH_MEDICINES_SUCCESS,
        payload: { medicines, paginationObj }
    }
}

export const fetchMedicinesFailure = (err) => {
    return {
        type: FETCH_MEDICINES_FAILURE,
        payload: err
    }
}


// export const getMedicines = (options={}) => {
//     console.log('OPTIONS:::', options)
//     return (dispatch, getState, { getFirestore }) => {
//         dispatch(fetchMedicines());
//         dispatch(apiLoading());
//         const firestore = getFirestore();
//         let query;
//         let lastVisible;
//         let firstVisible;
//         if(options.first) {
//             query = firestore.collection("medicines")
//                     .orderBy('med_name')
//                     .limit(25)
//                     .get();
//         } else if(!options.first && options.forward) {
//             query = firestore.collection("medicines")                    
//                     .orderBy('med_name')
//                     .startAfter(options.lastDoc)
//                     .limit(25)
//                     .get();
//         } else if(!options.first && !options.forward) {
//             query = firestore.collection("medicines")                    
//                     .orderBy('med_name')
//                     .endAt(options.lastDoc)
//                     .limit(25)
//                     .get();
//         }
//         query.then((querySnapshot) => {
//             console.log(querySnapshot.docs.length);
//             lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
//             firstVisible = querySnapshot.docs[0]
//             let medicinesArray = [];
//             querySnapshot.forEach((doc) => {
//                 console.log('DOC IS', doc);
//                 console.log(`${doc.id} => ${doc.data()}`);
//                 medicinesArray.push({ ...doc.data(), id: doc.id })
//             });
//             console.log(medicinesArray);
//             dispatch(apiLoadingFailure())
//             dispatch(fetchMedicinesSuccess(medicinesArray,lastVisible, firstVisible))
//         }).catch(err => {
//             dispatch(apiLoadingFailure());
//             dispatch(fetchMedicinesFailure(err))
//         });        
//     }
// };


export const getMedicines = (options = {}) => {
    console.log('In action', options)

    return (dispatch, getState, { getFirestore }) => {
        dispatch(fetchMedicines());
        dispatch(apiLoading());

        API.get('/search/A', {
            params: {
                page: options.page
            }
        }).then(response => {
            console.log(response.data.data);
            const firstVisible = response.data.data.docs[0];
            const lastVisible = response.data.data.docs[response.data.data.docs.length - 1];
            const medicinesArray = response.data.data.docs;

            const paginationObjResponse = response.data.data;

            const paginationObj = {
                "totalDocs": paginationObjResponse.totalDocs,
                "limit": paginationObjResponse.limit,
                "totalPages": paginationObjResponse.totalPages,
                "page": paginationObjResponse.page,
                "pagingCounter": paginationObjResponse.pagingCounter,
                "hasPrevPage": paginationObjResponse.hasPrevPage,
                "hasNextPage": paginationObjResponse.hasNextPage,
                "prevPage": paginationObjResponse.prevPage,
                "nextPage": paginationObjResponse.prevPage
            }

            dispatch(apiLoadingFailure())
            dispatch(fetchMedicinesSuccess(medicinesArray, paginationObj))
        }).catch(err => {
            console.log('error is', err);
            dispatch(apiLoadingFailure());
            dispatch(fetchMedicinesFailure(err))
        })
    };
    
}