import { GET_RADIUS_FAILURE, GET_RADIUS_REQUEST, GET_RADIUS_SUCCESS, PUT_RADIUS_FAILURE, PUT_RADIUS_REQUEST, PUT_RADIUS_SUCCESS } from "../../constants/radius/radiusConstant"

const initialState = {
    data: null,
    isLoading: false,
    error: null
}

export function getRadiusReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RADIUS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_RADIUS_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case GET_RADIUS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export function putRadiusReducer(state = {...initialState}, action) {
    switch (action.type) {
        case PUT_RADIUS_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case PUT_RADIUS_SUCCESS:
            return {
                data: true,
                isLoading: false,
                error: null
            }
        case PUT_RADIUS_FAILURE:
            return {
                data: false,
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