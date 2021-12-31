import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT, SET_USER } from '../redux/userActions';
const AuthContext = React.createContext();
export function useAuth() {
	return useContext(AuthContext);
}

// TODO: redux store for storing user data

const API_URL = 'http://localhost:8080';

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	const [userToken, setUserToken, removeCookie] = useCookies(['token']);
	const tokenKey = 'token';

	let userSelector = useSelector(state => state.user);

	const dispatch = useDispatch();

	async function signup(email, password, firstname, lastname, telephonenumber) {
		await axios.post(`${API_URL}/auth/signup`, { email, password, firstname, lastname, telephone: telephonenumber })
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	}

	async function login(email, password) {

		await axios.post(API_URL + '/auth/login', { email: email, password: password })

			.then((response) => {
				let data = response.data;
				let credentials = {
					email: data.email,
					firstname: data.firstname,
					lastname: data.lastname,
					telephone: data.telephone,
				};
				setUser({ ...credentials });

				let expireDate = new Date();
				expireDate.setDate(expireDate.getDate() + 3);

				setUserToken(tokenKey, data.token, { expires: expireDate });
				// store.dispatch({ type: SET_USER, payload: credentials });
				dispatch({ type: SET_USER, payload: { user: credentials } });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async function logout() {
		removeCookie(tokenKey);
		setUser(null);
		// store.dispatch({ type: LOGOUT });
		dispatch({ type: LOGOUT });
	}

	useEffect(async () => {
		if (user) {
			return;
		}
		// check here if user is still available on database
		let token = userToken[tokenKey];
		if (token) {
			await axios.post(API_URL + '/auth/check', { token: token })
				.then((response) => {
					setUser(userSelector);
				})
				.catch((error) => {
					logout();
				});
		}
	}, []);

	const value = {
		user,
		login,
		signup,
		logout
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
