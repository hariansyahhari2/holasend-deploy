import axios from "../../api";
import { put, takeLatest } from "@redux-saga/core/effects";
import { GET_RADIUS_FAILURE, GET_RADIUS_REQUEST, GET_RADIUS_SUCCESS, PUT_RADIUS_FAILURE, PUT_RADIUS_REQUEST, PUT_RADIUS_SUCCESS} from "../../constants/radius/radiusConstant";


function* getRadiusSaga() {
    let result = yield axios.get('/offset')
    .then(data => {
        return ({
            type: GET_RADIUS_SUCCESS,
            data: data
        })
    })
    .catch(e => {
        return ({
            type: GET_RADIUS_FAILURE,
            error: e
        })
    })

    yield put(result)
}

function* putRadiusSaga(action) {
    let model = action.model
    let method = "PUT"
    let url = `/offset/${model}`

    let result = yield axios({
        url: url,
        method: method
    })
    .then(data => {
        return {
            type: PUT_RADIUS_SUCCESS,
            data: data
        }
    })
    .catch(e => {
        return {
            type: PUT_RADIUS_FAILURE,
            error: e
        }
    })
    
    yield put(result)
}

export function* watchPutRadiusSaga() {
    yield takeLatest(PUT_RADIUS_REQUEST, putRadiusSaga)
}

export function* watchGetRadiusSaga() {
    yield takeLatest(GET_RADIUS_REQUEST, getRadiusSaga)
}