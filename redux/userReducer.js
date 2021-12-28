import { SET_USER, LOGOUT } from "./userActions";


const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "persist/REHYDRATE":
        case SET_USER:
            if (action.payload === undefined) {
                return { ...state };
            }
            console.log(action.payload);
            const email = action.payload.user.email;
            const firstname = action.payload.user.firstname;
            const lastname = action.payload.user.lastname;
            return { email, firstname, lastname };
        // return { ...state };
        case LOGOUT:
            return {};
        default:
            return { ...state };
    }
}

export default userReducer;