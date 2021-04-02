import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../../constants/register/registerConstant"

const initialState = {
    data: null,
    isLoading: false,
    error: null
}

export function registerReducer(state = {...initialState}, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case REGISTER_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case REGISTER_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: action.error
            }
        default:
            return {
                ...state,
                data: null
            }
    }
}