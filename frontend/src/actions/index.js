import { USER_AUTH, THIS_ROUTE } from "./actionTypes";

export function setReduxThisRoute(data) {
    return {
        type: THIS_ROUTE,
        data
    };
}

export function setReduxUserAuth(data) {
    return {
        type: USER_AUTH,
        data
    };
}
