import {ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART} from './cartTypes';

export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        payload: item
    }
}

export const removeFromCart = (itemId) => {
    console.log('action', itemId)
    return {
        type: REMOVE_FROM_CART,
        payload: itemId
    }
}