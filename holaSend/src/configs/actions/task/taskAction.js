import { DELETE_BY_ID_TASK_REQUEST, GET_ALL_TASK_FINISHED_REQUEST, GET_ALL_TASK_REQUEST, GET_ALL_TASK_UNFINISHED_REQUEST, POST_TASK_REQUEST, PUT_TASK_DONE_BY_ADMIN_REQUEST } from "../../constants/task/taskConstant";

export function postTaskAction(model) {
    return {
        type: POST_TASK_REQUEST,
        model: model
    }
}

export function getAllTaskAction(pagination, search) {
    return {
        type: GET_ALL_TASK_REQUEST,
        pagination: pagination,
        search: search
    }
}

export function deleteByIdTaskAction(id) {
    return {
        type: DELETE_BY_ID_TASK_REQUEST,
        id: id 
    }
}

export function getAllTaskFinishedAction(pagination, search) {
    return {
        type: GET_ALL_TASK_FINISHED_REQUEST,
        pagination: pagination,
        search: search
    }
} 

export function getAllTaskUnfinishedAction() {
    return {
        type: GET_ALL_TASK_UNFINISHED_REQUEST,
    }
} 

export function putTaskDoneByAdminAction(id) {
    return {
        type: PUT_TASK_DONE_BY_ADMIN_REQUEST,
        id: id 
    }
}