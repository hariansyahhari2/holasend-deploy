import { GET_CHARTS_TASK_REQUEST, GET_CHARTS_USER_REQUEST } from "../../constants/charts/chartsConstant"

export function getChartsUserAction() {
    return {
        type: GET_CHARTS_USER_REQUEST
    }
}

export function getChartsTaskAction() {
    return {
        type: GET_CHARTS_TASK_REQUEST
    }
}