import { REGISTER_REQUEST } from "../../constants/register/registerConstant";

export function registerAction(model) {
    return {
        type: REGISTER_REQUEST,
        model: model
    }
}