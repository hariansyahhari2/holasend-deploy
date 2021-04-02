import { GET_CHARTS_TASK_FAILURE, GET_CHARTS_TASK_REQUEST, GET_CHARTS_TASK_SUCCESS, GET_CHARTS_USER_FAILURE, GET_CHARTS_USER_REQUEST, GET_CHARTS_USER_SUCCESS } from "../../constants/charts/chartsConstant"

const initialState = {
    data: null,
    isLoading: false,
    error: null
}

export function getChartsUserReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHARTS_USER_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_CHARTS_USER_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case GET_CHARTS_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export function getChartsTaskReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHARTS_TASK_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_CHARTS_TASK_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case GET_CHARTS_TASK_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}