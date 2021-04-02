import axios from "../../api";
import { put, takeLatest } from "@redux-saga/core/effects";
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, PUT_PROFILE_FAILURE, PUT_PROFILE_REQUEST, PUT_PROFILE_SUCCESS } from "../../constants/profile/profileConstant";

function* getProfileSaga(action) {
    let result = yield axios.get('/user/me')
    .then(data => {
        return ({
            type: GET_PROFILE_SUCCESS,
            data: data
        })
    })
    .catch(e => {
        return ({
            type: GET_PROFILE_FAILURE,
            error: e
        })
    })

    yield put(result);
}

function* putProfileSaga(action) {
    
    let model = action.model
    let method = 'PUT'
    let url = '/user'
    
    let result = yield axios({
        url: url,
        method: method,
        data: model
    })
    .then(data => {
        return {
            type: PUT_PROFILE_SUCCESS,
            data: data
        }
    })
    .catch(e => {
        return {
            type: PUT_PROFILE_FAILURE,
            error: e
        }
    })
    
    yield put(result)
}

export function* watchGetProfileSaga() {
    yield takeLatest(GET_PROFILE_REQUEST, getProfileSaga)
}

export function* watchPutProfileSaga() {
    yield takeLatest(PUT_PROFILE_REQUEST, putProfileSaga)
}