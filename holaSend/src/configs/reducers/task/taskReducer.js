import { DELETE_BY_ID_TASK_FAILURE, DELETE_BY_ID_TASK_REQUEST, DELETE_BY_ID_TASK_SUCCESS, GET_ALL_TASK_FAILURE, GET_ALL_TASK_FINISHED_FAILURE, GET_ALL_TASK_FINISHED_REQUEST, GET_ALL_TASK_FINISHED_SUCCESS, GET_ALL_TASK_REQUEST, GET_ALL_TASK_SUCCESS, GET_ALL_TASK_UNFINISHED_FAILURE, GET_ALL_TASK_UNFINISHED_REQUEST, GET_ALL_TASK_UNFINISHED_SUCCESS, POST_TASK_FAILURE, POST_TASK_REQUEST, POST_TASK_SUCCESS, PUT_TASK_DONE_BY_ADMIN_FAILURE, PUT_TASK_DONE_BY_ADMIN_REQUEST, PUT_TASK_DONE_BY_ADMIN_SUCCESS } from "../../constants/task/taskConstant"

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

export function postTaskReducer(state = {...initialState}, action) {
    switch (action.type) {
        case POST_TASK_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case POST_TASK_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case POST_TASK_FAILURE:
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

export function getAllTaskReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TASK_REQUEST:
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
        case GET_ALL_TASK_SUCCESS:
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
        case GET_ALL_TASK_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export function deleteByIdTaskReducer(state = {...initialState, data: false}, action) {
    switch (action.type) {
        case DELETE_BY_ID_TASK_REQUEST:
            return {
                ...state,
                data: false,
                isLoading: true
            }
        case DELETE_BY_ID_TASK_SUCCESS:
            return { 
                data: action.data,
                isLoading: false,
                error: null
            }
        case DELETE_BY_ID_TASK_FAILURE:
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

export function getAllTaskFinishedReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TASK_FINISHED_REQUEST:
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
        case GET_ALL_TASK_FINISHED_SUCCESS:
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
        case GET_ALL_TASK_FINISHED_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export function getAllTaskUnfinishedReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TASK_UNFINISHED_REQUEST:
            return {
                ...state,
                data: null,
                isLoading: true
            }
        case GET_ALL_TASK_UNFINISHED_SUCCESS:
            return {
                data: action.data,
                isLoading: false,
                error: null
            }
        case GET_ALL_TASK_UNFINISHED_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}

export function putTaskDoneByAdminReducer(state = {...initialState, data: false}, action) {
    console.log("ini reduccer", action);
    switch (action.type) {
        case PUT_TASK_DONE_BY_ADMIN_REQUEST:
            return {
                ...state,
                data: false,
                isLoading: true
            }
        case PUT_TASK_DONE_BY_ADMIN_SUCCESS:
            return { 
                data: action.data,
                isLoading: false,
                error: null
            }
        case PUT_TASK_DONE_BY_ADMIN_FAILURE:
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