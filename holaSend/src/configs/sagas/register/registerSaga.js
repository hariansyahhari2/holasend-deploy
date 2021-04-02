import axios from "../../api"
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../../constants/register/registerConstant"
import { put, takeLatest } from 'redux-saga/effects'

function* registerSaga(action) {
    
    let model = action.model
    let method = 'POST'
    let url = '/user/register'

    let result = yield axios({
        url: url,
        method: method,
        data: model
    })
    .then(data => {
        return {
            type: REGISTER_SUCCESS,
            data: data
        }
    })
    .catch(e => {
        return {
            type: REGISTER_FAILURE,
            error: e
        }
    })

    yield put(result)
}

export function* watchRegisterSaga() {
    yield takeLatest(REGISTER_REQUEST, registerSaga)
}