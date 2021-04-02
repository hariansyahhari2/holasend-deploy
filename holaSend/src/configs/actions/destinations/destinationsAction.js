import { 
    DELETE_BY_ID_DESTINATIONS_REQUEST, 
    GET_ALL_DESTINATIONS_FILTER_REQUEST, 
    GET_ALL_DESTINATIONS_REQUEST, 
    GET_BY_ID_DESTINATIONS_REQUEST, 
    POST_DESTINATIONS_REQUEST, 
    PUT_BY_ID_DESTINATIONS_REQUEST
} from "../../constants/destinations/destinationsConstant";

export function getAllDestinationsFilterAction() {
    return {
        type: GET_ALL_DESTINATIONS_FILTER_REQUEST
    }
}

export function postDestinationsAction(model) {
    return {
        type: POST_DESTINATIONS_REQUEST,
        model: model
    }
}

export function getAllDestinationsAction(pagination) {
    return {
        type: GET_ALL_DESTINATIONS_REQUEST,
        pagination: pagination,
    }
}

export function deleteByIdDestinationsAction(id) {
    return {
        type: DELETE_BY_ID_DESTINATIONS_REQUEST,
        id: id 
    }
}

export function getByIdDestinationsAction(id) {
    return {
        type: GET_BY_ID_DESTINATIONS_REQUEST,
        id: id 
    }
}

export function putByIdDestinationsAction(model) {
    return {
        type: PUT_BY_ID_DESTINATIONS_REQUEST,
        model: model
    }
}