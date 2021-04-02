import { GET_PROFILE_REQUEST, PUT_PROFILE_REQUEST } from "../../constants/profile/profileConstant";

export function getProfileAction() {
    return {
        type: GET_PROFILE_REQUEST
    }
}

export function putProfileAction(model) {
    return {
        type: PUT_PROFILE_REQUEST,
        model: model
    }
}