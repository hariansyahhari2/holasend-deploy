import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, PUT_PROFILE_FAILURE, PUT_PROFILE_REQUEST, PUT_PROFILE_SUCCESS } from "../../constants/profile/profileConstant"

const initialState = {
    data: null,
    isLoading: false,
    error: null
}

export function getProfileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_PROFILE_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case GET_PROFILE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export function putProfileReducer(state = {...initialState}, action) {
    switch (action.type) {
        case PUT_PROFILE_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case PUT_PROFILE_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case PUT_PROFILE_FAILURE:
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