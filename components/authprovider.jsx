import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

const API_URL = 'http://localhost:8080/';

export function AuthProvider({ children }) {
	const [ user, setUser ] = useState();
	const [ loading, setLoading ] = useState(false);

	const [ userToken, setUserToken, removeCookie ] = useCookies([ 'token' ]);
	const tokenKey = 'token';

	async function signup(email, password) {
		throw new Error('Not implemented');
	}

	async function login(email, password) {
		const body = {
			username: email,
			password
		};
		await axios.post(API_URL + 'api/auth/signin', body).then((response) => {
			let data = response.data;
			let credentials = {
				username: data.username
			};
			setUserToken(tokenKey, data.token);
			setUser({ ...credentials });
		});
	}

	useEffect(() => {
		if (user) {
			return;
		}
		let token = userToken[tokenKey];
		if (!token) {
			return;
		}
		axios
			.get(API_URL + 'api/auth/credentials', { headers: { Authorization: 'Bearer ' + token } })
			.then((res) => {
				let data = res.data;
				let logged = {
					email: data.username
				};
				setUser(logged);
			})
			.catch((err) => console.log(err));
	}, []);

	const value = {
		user,
		login,
		signup
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
