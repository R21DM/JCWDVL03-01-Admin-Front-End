import { LOGIN, LOGOUT } from '../actions/types'

const INITIAL_STATE = {
    id : null,
    UID : null,
    username : '',
    email : '',
    role : null
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN :
            if (!action.payload) {
                return INITIAL_STATE
            }
            return {
                ...state,
                id : action.payload.id,
                UID : action.payload.UID,
                username : action.payload.username,
                email : action.payload.email,
                role: action.payload.role
            }
        case LOGOUT :
            return INITIAL_STATE
        default :
            return state
    }
}

export default userReducer