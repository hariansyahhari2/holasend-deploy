import { GET_RADIUS_REQUEST, PUT_RADIUS_REQUEST } from "../../constants/radius/radiusConstant";


export function getRadiusAction() {
    return {
        type: GET_RADIUS_REQUEST
    }
}

export function putRadiusAction(model) {
    return {
        type: PUT_RADIUS_REQUEST,
        model: model
    }
}


