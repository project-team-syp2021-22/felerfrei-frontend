import { SET_USER, LOGOUT } from "./userActions";


const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "persist/REHYDRATE":
        case SET_USER:
            if (action.payload === undefined) {
                return { ...state };
            }

            const email = action.payload.user.email;
            const firstname = action.payload.user.firstname;
            const lastname = action.payload.user.lastname;
            const telephone = action.payload.user.telephone;
            return { email, firstname, lastname, telephone };

        // return { ...state };
        case LOGOUT:
            return {};
        default:
            return { ...state };
    }
}

export default userReducer;