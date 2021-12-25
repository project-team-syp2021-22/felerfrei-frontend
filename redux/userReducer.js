import { SET_USER } from "./userActions";


const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        case LOGOUT:
            return {};
        default:
            return state;
    }
}

export default userReducer;