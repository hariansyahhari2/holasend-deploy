import { DELETE_BY_ID_DESTINATIONS_FAILURE, DELETE_BY_ID_DESTINATIONS_REQUEST, DELETE_BY_ID_DESTINATIONS_SUCCESS, GET_ALL_DESTINATIONS_FAILURE, GET_ALL_DESTINATIONS_FILTER_FAILURE, GET_ALL_DESTINATIONS_FILTER_REQUEST, GET_ALL_DESTINATIONS_FILTER_SUCCESS, GET_ALL_DESTINATIONS_REQUEST, GET_ALL_DESTINATIONS_SUCCESS, GET_BY_ID_DESTINATIONS_FAILURE, GET_BY_ID_DESTINATIONS_REQUEST, GET_BY_ID_DESTINATIONS_SUCCESS, POST_DESTINATIONS_FAILURE, POST_DESTINATIONS_REQUEST, POST_DESTINATIONS_SUCCESS, PUT_BY_ID_DESTINATIONS_FAILURE, PUT_BY_ID_DESTINATIONS_REQUEST, PUT_BY_ID_DESTINATIONS_SUCCESS } from "../../constants/destinations/destinationsConstant"

const initialState = {
    data: null,
    isLoading: false,
    pagination: {
        size: null,
        total: null,
        page: null
    },
    error: null
}

export function getAllDestinationsFilterReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DESTINATIONS_FILTER_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_ALL_DESTINATIONS_FILTER_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case GET_ALL_DESTINATIONS_FILTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export function postDestinationsReducer(state = {...initialState}, action) {
    switch (action.type) {
        case POST_DESTINATIONS_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case POST_DESTINATIONS_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case POST_DESTINATIONS_FAILURE:
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

export function getAllDestinationsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DESTINATIONS_REQUEST:
            return {
                ...state,
                data: null,
                pagination: {
                    size: null,
                    total: null,
                    page: null
                },
                isLoading: true
            }
        case GET_ALL_DESTINATIONS_SUCCESS:
            return {
                data: action.data,
                pagination: {
                    size: action.pagination.size,
                    total: action.pagination.total,
                    page: action.pagination.page
                },
                isLoading: false,
                error: null
            }
        case GET_ALL_DESTINATIONS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export function deleteByIdDestinationsReducer(state = {...initialState, data: false}, action) {
    switch (action.type) {
        case DELETE_BY_ID_DESTINATIONS_REQUEST:
            return {
                ...state,
                data: false,
                isLoading: true
            }
        case DELETE_BY_ID_DESTINATIONS_SUCCESS:
            return { 
                data: action.data,
                isLoading: false,
                error: null
            }
        case DELETE_BY_ID_DESTINATIONS_FAILURE:
            return { 
                data: false,
                isLoading: false,
                error: action.error
            }
        default:
            return {
                ...state,
                data: false
            }
    }
}

export function getByIdDestinationsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BY_ID_DESTINATIONS_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case GET_BY_ID_DESTINATIONS_SUCCESS:
            return { 
                data: action.data,
                isLoading: false,
                error: null
            }
        case GET_BY_ID_DESTINATIONS_FAILURE:
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

export function putByIdDestinationsReducer(state = {...initialState}, action) {
    switch (action.type) {
        case PUT_BY_ID_DESTINATIONS_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case PUT_BY_ID_DESTINATIONS_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case PUT_BY_ID_DESTINATIONS_FAILURE:
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