import { GET_PRODUCTS, START_GET_PRODUCTS, END_GET_PRODUCTS } from '../actions/types'

const INITIAL_STATE = {
    data : [],
    loading : false
}

function productsReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_PRODUCTS :
            return { ...state, data : action.payload }
        case START_GET_PRODUCTS :
            return { ...state, loading : true }
        case END_GET_PRODUCTS :
            return { ...state, loading : false }
        default :
            return state
    }
}

export default productsReducer