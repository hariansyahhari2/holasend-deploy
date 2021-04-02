import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "../../api"
import { GET_CHARTS_TASK_FAILURE, GET_CHARTS_TASK_REQUEST, GET_CHARTS_TASK_SUCCESS, GET_CHARTS_USER_FAILURE, GET_CHARTS_USER_REQUEST, GET_CHARTS_USER_SUCCESS } from "../../constants/charts/chartsConstant";

function* getChartsUserSaga(action) {

    let result = yield axios.get('/user/dashboard')
    .then(data => {
        return ({
            type: GET_CHARTS_USER_SUCCESS,
            data: data
        })
    })
    .catch(e => {
        return ({
            type: GET_CHARTS_USER_FAILURE,
            error: e
        })
    })

    yield put(result);
}

function* getChartsTaskSaga(action) {

    let result = yield axios.get('/task/dashboard')
    .then(data => {
        return ({
            type: GET_CHARTS_TASK_SUCCESS,
            data: data
        })
    })
    .catch(e => {
        return ({
            type: GET_CHARTS_TASK_FAILURE,
            error: e
        })
    })

    yield put(result);
}

export function* watchGetChartsUserSaga() {
    yield takeLatest(GET_CHARTS_USER_REQUEST, getChartsUserSaga)
}

export function* watchGetChartsTaskSaga() {
    yield takeLatest(GET_CHARTS_TASK_REQUEST, getChartsTaskSaga)
}