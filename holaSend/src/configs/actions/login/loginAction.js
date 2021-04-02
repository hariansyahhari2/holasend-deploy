import { LOGIN_REQUEST } from "../../constants/login/loginConstant";

export function loginAction(model) {
    return {
        type: LOGIN_REQUEST,
        model: model
    }
}