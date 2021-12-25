import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import { LOGOUT, SET_USER } from '../redux/userActions';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

// TODO: redux store for storing user data

const API_URL = 'http://localhost:8080/';

export function AuthProvider({ children }) {
	const [ user, setUser ] = useState();

	const [ userToken, setUserToken, removeCookie ] = useCookies([ 'token' ]);
	const tokenKey = 'token';

	const userSelector = useSelector(state => state.user)
	const dispatch = useDispatch();

	async function signup(email, password) {
		throw new Error('Not implemented');
	}

	async function login(email, password) {
		const body = {
			email,
			password
		};
		await axios.post(API_URL + 'api/auth/signin', body).then((response) => {
			let data = response.data;
			let credentials = {
				email: data.email
			};
			setUserToken(tokenKey, data.token);
			setUser({ ...credentials });
			dispatch({type: SET_USER, payload: credentials})
		});
	}

	async function logout() {
		removeCookie(tokenKey);
		setUser(null);
		dispatch({type: LOGOUT})
	}

	useEffect(() => {
		if (user) {
			return;
		}
		let token = userToken[tokenKey];
		if (!token) {
			return;
		}
		console.log('token: ', token);
		axios
			.get(API_URL + 'api/auth/credentials', { headers: { Authorization: 'Bearer ' + token } })
			.then((res) => {
				let data = res.data;
				let logged = {
					email: data.email
				};
				setUser(logged);
			})
			.catch((err) => console.log(err));
	}, []);

	const value = {
		user,
		login,
		signup,
		logout
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
