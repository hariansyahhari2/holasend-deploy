import { CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, FORGET_PASSWORD_FAILURE, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAILURE, RECOVER_PASSWORD_REQUEST, RECOVER_PASSWORD_SUCCESS } from "../../constants/password/passwordConstant";

const initialState = {
    data: null,
    isLoading: false,
    error: null
}

export function forgetPasswordReducer(state = initialState, action) {
    switch (action.type) {
        case FORGET_PASSWORD_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true,
            }
        case FORGET_PASSWORD_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case FORGET_PASSWORD_FAILURE:
            return {
                data: null,
                isLoading: false,
                error: action.error
            }    
        default:
            return {
                ...state, 
                data: null
            };
    }
}

export function recoverPasswordReducer(state = {...initialState}, action) {
    switch (action.type) {
        case RECOVER_PASSWORD_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case RECOVER_PASSWORD_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case RECOVER_PASSWORD_FAILURE:
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

export function changePasswordReducer(state = {...initialState}, action) {
    switch (action.type) {
        case CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case CHANGE_PASSWORD_FAILURE:
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