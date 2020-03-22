const INITIAL_STATE = {
    addedItems: [],
    loading : false,
    total : 0,
}

export const cartReducer = (state = INITIAL_STATE,action) => {
    switch(action.type){
        case 'ADD_TO_CART':
            return{
                ...state,
                loading : true 
            }
        default :
            return state
    }

}