export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
};
export const logout = () => {
    return {
        type: LOGOUT
    }
}
