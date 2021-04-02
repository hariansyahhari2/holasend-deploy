import { 
    GET_ALL_USER_FILTER_REQUEST, 
    GET_ALL_USER_REQUEST, 
    PUT_BY_USERNAME_MAKE_ADMIN_REQUEST, 
    PUT_BY_USERNAME_MAKE_COURIER_REQUEST, 
    PUT_BY_USERNAME_MAKE_DISABLED_REQUEST, 
    PUT_BY_USERNAME_MAKE_STAFF_REQUEST 
} from "../../constants/user/userConstant";

export function getAllUserFilterAction() {
    return {
        type: GET_ALL_USER_FILTER_REQUEST
    }
}

export function getAllUserAction(pagination, filter) {
    return {
        type: GET_ALL_USER_REQUEST,
        pagination: pagination,
        filter: filter
    }
}

export function putByUsernameMakeAdminAction(username) {
    return {
        type: PUT_BY_USERNAME_MAKE_ADMIN_REQUEST,
        username: username
    }
}

export function putByUsernameMakeStaffAction(username) {
    return {
        type: PUT_BY_USERNAME_MAKE_STAFF_REQUEST,
        username: username
    }
}

export function putByUsernameMakeCourierAction(username) {
    return {
        type: PUT_BY_USERNAME_MAKE_COURIER_REQUEST,
        username: username
    }
}

export function putByUsernameMakeDisabledAction(username) {
    return {
        type: PUT_BY_USERNAME_MAKE_DISABLED_REQUEST,
        username: username
    }
}