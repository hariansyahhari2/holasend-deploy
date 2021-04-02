import { all } from 'redux-saga/effects'
import { watchGetChartsTaskSaga, watchGetChartsUserSaga } from './charts/chartsSaga';
import { 
    watchDeleteByIdDestinationskSaga, 
    watchGetAllDestinationsFilterSaga, 
    watchGetAllDestinationsSaga, 
    watchGetByIdDestinationskSaga, 
    watchPostDestinationsSaga, 
    watchPutByIdDestinationskSaga
} from './destinations/destinationsSaga';
import { watchLoginSaga } from "./login/loginSaga";
import { watchChangePasswordSaga, watchForgetPasswordSaga, watchRecoverPasswordSaga } from './password/passwordSaga';
import { watchGetProfileSaga, watchPutProfileSaga } from './profile/profileSaga';
import { watchRegisterSaga } from './register/registerSaga';
import { 
    watchDeleteByIdTaskSaga, 
    watchGetAllTaskSaga, 
    watchPostTaskSaga, 
    watchGetAllTaskFinishedSaga, 
    watchGetAllTaskUnfinishedSaga
} from './task/taskSaga';
import { 
    watchGetAllUserFilterSaga, 
    watchGetAllUserSaga, 
    watchPutByUsernameMakeAdminSaga, 
    watchPutByUsernameMakeCourierSaga, 
    watchPutByUsernameMakeDisabledSaga, 
    watchPutByUsernameMakeStaffSaga 
} from './user/userSaga';

import {
    watchGetRadiusSaga,
    watchPutRadiusSaga
} from './radius/radiusSaga'

export default function* rootSaga() {
    yield all([
        watchLoginSaga(),
        watchRegisterSaga(),
        watchGetAllDestinationsFilterSaga(),
        watchPostTaskSaga(),
        watchPostDestinationsSaga(),
        watchGetAllTaskSaga(),
        watchDeleteByIdTaskSaga(),
        watchGetAllUserFilterSaga(),
        watchGetAllUserSaga(),
        watchPutByUsernameMakeAdminSaga(),
        watchPutByUsernameMakeStaffSaga(),
        watchPutByUsernameMakeCourierSaga(),
        watchPutByUsernameMakeDisabledSaga(),
        watchGetAllDestinationsSaga(),
        watchDeleteByIdDestinationskSaga(),
        watchGetAllTaskFinishedSaga(),
        watchGetAllTaskUnfinishedSaga(),
        watchForgetPasswordSaga(),
        watchRecoverPasswordSaga(),
        watchChangePasswordSaga(),
        watchGetChartsUserSaga(),
        watchGetChartsTaskSaga(),
        watchGetByIdDestinationskSaga(),
        watchPutByIdDestinationskSaga(),
        watchGetProfileSaga(),
        watchPutProfileSaga(),
        watchGetRadiusSaga(),
        watchPutRadiusSaga()
    ])
}