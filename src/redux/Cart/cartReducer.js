import {ADD_TO_CART, REMOVE_FROM_CART} from './cartTypes';


const initialState = {
    items: {},
    cartTotal: 0
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART: 
            const item = action.payload;
            let newLocalItem = {};
            let finalItemsObj = {};
            let finalCartTotal = 0;
            if(item.id in state.items) {
                let localItem = state.items[item.id];
                localItem['qty'] = localItem['qty'] + 1;
                localItem['total'] = localItem['total'] + item.med_price;
                finalItemsObj = {...state.items}
            } else {
                newLocalItem = {
                    [item.id] : {
                        item: item,
                        qty: 1,
                        total: item.med_price
                    }                    
                }
                finalItemsObj = {...state.items, ...newLocalItem}
            }
            for(let key in finalItemsObj) {
                let itemForCalculation = finalItemsObj[key];
                finalCartTotal += itemForCalculation.total;
            }            
            return {
                items: finalItemsObj,
                cartTotal: finalCartTotal.toFixed(2)
            }
        case REMOVE_FROM_CART:{
            const item = action.payload;
            const finalItemsObj = state.items;
            let finalCartTotal = 0;
            delete finalItemsObj[item]
            for(let key in finalItemsObj) {
                let itemForCalculation = finalItemsObj[key];
                finalCartTotal += itemForCalculation.total;
            }
            return {
                items: finalItemsObj,
                cartTotal: finalCartTotal.toFixed(2)
            }
        }
        default: return state;
    }
}

export default cartReducer;