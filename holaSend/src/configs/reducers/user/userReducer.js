import { 
    GET_ALL_USER_FILTER_REQUEST, 
    GET_ALL_USER_FILTER_SUCCESS, 
    GET_ALL_USER_FILTER_FAILURE, 
    GET_ALL_USER_REQUEST, 
    GET_ALL_USER_SUCCESS, 
    GET_ALL_USER_FAILURE, 
    PUT_BY_USERNAME_MAKE_ADMIN_REQUEST,
    PUT_BY_USERNAME_MAKE_ADMIN_SUCCESS, 
    PUT_BY_USERNAME_MAKE_ADMIN_FAILURE,
    PUT_BY_USERNAME_MAKE_STAFF_REQUEST,
    PUT_BY_USERNAME_MAKE_STAFF_SUCCESS,
    PUT_BY_USERNAME_MAKE_STAFF_FAILURE,
    PUT_BY_USERNAME_MAKE_COURIER_REQUEST,
    PUT_BY_USERNAME_MAKE_DISABLED_REQUEST,
    PUT_BY_USERNAME_MAKE_DISABLED_FAILURE,
    PUT_BY_USERNAME_MAKE_COURIER_SUCCESS,
    PUT_BY_USERNAME_MAKE_COURIER_FAILURE,
    PUT_BY_USERNAME_MAKE_DISABLED_SUCCESS, 
} from "../../constants/user/userConstant"

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

export function getAllUserFilterReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USER_FILTER_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_ALL_USER_FILTER_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case GET_ALL_USER_FILTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export function getAllUserReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USER_REQUEST:
            return {
                ...state,
                pagination: {
                    size: null,
                    total: null,
                    page: null
                },
                isLoading: true
            }
        case GET_ALL_USER_SUCCESS:
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
        case GET_ALL_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export function putByUsernameMakeAdminReducer(state = {...initialState, data: false}, action) {
    switch (action.type) {
        case PUT_BY_USERNAME_MAKE_ADMIN_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case PUT_BY_USERNAME_MAKE_ADMIN_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case PUT_BY_USERNAME_MAKE_ADMIN_FAILURE:
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

export function putByUsernameMakeStaffReducer(state = {...initialState, data: false}, action) {
    switch (action.type) {
        case PUT_BY_USERNAME_MAKE_STAFF_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case PUT_BY_USERNAME_MAKE_STAFF_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case PUT_BY_USERNAME_MAKE_STAFF_FAILURE:
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

export function putByUsernameMakeCourierReducer(state = {...initialState, data: false}, action) {
    switch (action.type) {
        case PUT_BY_USERNAME_MAKE_COURIER_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case PUT_BY_USERNAME_MAKE_COURIER_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case PUT_BY_USERNAME_MAKE_COURIER_FAILURE:
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

export function putByUsernameMakeDisabledReducer(state = {...initialState, data: false}, action) {
    switch (action.type) {
        case PUT_BY_USERNAME_MAKE_DISABLED_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case PUT_BY_USERNAME_MAKE_DISABLED_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case PUT_BY_USERNAME_MAKE_DISABLED_FAILURE:
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